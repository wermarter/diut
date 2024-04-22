import { NodeEnv } from '@diut/common'
import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CookieOptions, Response, Request } from 'express'

import {
  AppConfig,
  AuthConfig,
  loadAppConfig,
  loadAuthConfig,
} from 'src/config'
import {
  AuthPayload,
  CacheKeyFactory,
  CachePrimaryServiceToken,
  EAuthnJwtInvalidToken,
  ICachePrimaryService,
} from 'src/domain'

export type AuthCookies = {
  accessToken: string
  refreshToken: string
}

const ACCESS_TOKEN_COOKIE = 'access_token'
const REFRESH_TOKEN_COOKIE = 'refresh_token'

type RefreshTokenTaskResult = {
  accessToken: string
  refreshToken: string
}

const REFRESH_TOKEN_TASK_TIMEOUT_SECONDS = 10

@Injectable()
export class HttpAuthService {
  constructor(
    @Inject(loadAuthConfig.KEY) private authConfig: AuthConfig,
    @Inject(loadAppConfig.KEY) private appConfig: AppConfig,
    private readonly jwtService: JwtService,
    @Inject(CachePrimaryServiceToken)
    private readonly cacheService: ICachePrimaryService,
  ) {}

  private makeCookieOptions(options?: CookieOptions): CookieOptions {
    const isDevelopment = this.appConfig.NODE_ENV === NodeEnv.Development

    return {
      httpOnly: true,
      secure: false, // !isDevelopment,
      sameSite: 'lax',
      ...options,
    }
  }

  setAuthCookie(res: Response, cookies: AuthCookies) {
    this.clearAuthCookie(res)

    res.cookie(
      ACCESS_TOKEN_COOKIE,
      cookies.accessToken,
      this.makeCookieOptions({
        expires: new Date(
          Date.now() +
            this.authConfig.AUTH_JWT_ACCESS_TOKEN_EXPIRE_SECONDS * 1000,
        ),
      }),
    )

    res.cookie(
      REFRESH_TOKEN_COOKIE,
      cookies.refreshToken,
      this.makeCookieOptions({
        expires: new Date(
          Date.now() +
            this.authConfig.AUTH_JWT_REFRESH_TOKEN_EXPIRE_SECONDS * 1000,
        ),
      }),
    )
  }

  getAuthCookie(req: Request): Partial<AuthCookies> {
    const accessToken = req.cookies[ACCESS_TOKEN_COOKIE]
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE]

    return { accessToken, refreshToken }
  }

  clearAuthCookie(res: Response) {
    res.clearCookie(ACCESS_TOKEN_COOKIE)
    res.clearCookie(REFRESH_TOKEN_COOKIE)
  }

  async verifyAccessToken(accessToken: string) {
    try {
      return await this.jwtService.verifyAsync<AuthPayload>(accessToken, {
        secret: this.authConfig.AUTH_JWT_ACCESS_TOKEN_SECRET,
      })
    } catch (error) {
      return null
    }
  }

  async verifyRefreshToken(refreshToken: string) {
    try {
      return await this.jwtService.verifyAsync<AuthPayload>(refreshToken, {
        secret: this.authConfig.AUTH_JWT_REFRESH_TOKEN_SECRET,
      })
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async checkRefreshTokenTask(currentRefreshToken: string) {
    const value = await this.cacheService.client.get(
      CacheKeyFactory.refreshTokenTask(currentRefreshToken),
    )

    if (value === null) {
      return {
        isRunning: false,
        result: null,
      }
    }

    if (value === '0') {
      return {
        isRunning: true,
        result: null,
      }
    }

    const result = JSON.parse(value) as RefreshTokenTaskResult
    return {
      isRunning: false,
      result,
    } as const
  }

  async refreshTokenPair(currentRefreshToken: string) {
    const payload = await this.verifyRefreshToken(currentRefreshToken)
    if (payload === null) {
      throw new EAuthnJwtInvalidToken()
    }
    // @ts-ignore
    delete payload.iat
    // @ts-ignore
    const exp = payload.exp
    // @ts-ignore
    delete payload.exp

    let isRunning: boolean
    let result: null | RefreshTokenTaskResult

    do {
      await new Promise((resolve) => setTimeout(resolve, 100))
      const rv = await this.checkRefreshTokenTask(currentRefreshToken)
      isRunning = rv.isRunning
      result = rv.result
      if (isRunning === true) console.log('waiting')
    } while (isRunning === true)

    if (result !== null) {
      console.log('cache hit', currentRefreshToken.slice(-5))
      return result
    }

    console.log('cache miss', currentRefreshToken.slice(-5), result)
    let rv = await this.cacheService.client.set(
      CacheKeyFactory.refreshTokenTask(currentRefreshToken),
      '0',
      'EX',
      REFRESH_TOKEN_TASK_TIMEOUT_SECONDS,
      'NX',
    )
    if (rv !== 'OK') {
      throw new Error('Redis set error')
    }

    const accessToken = this.jwtService.sign(payload, {
      secret: this.authConfig.AUTH_JWT_ACCESS_TOKEN_SECRET,
      expiresIn: this.authConfig.AUTH_JWT_ACCESS_TOKEN_EXPIRE_SECONDS,
    })

    const expiresIn = exp - Math.ceil(Date.now() / 1000)
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.authConfig.AUTH_JWT_REFRESH_TOKEN_SECRET,
      expiresIn,
    })

    rv = await this.cacheService.client.set(
      CacheKeyFactory.refreshTokenTask(currentRefreshToken),
      '0',
      'EX',
      expiresIn,
      'NX',
    )
    if (rv !== 'OK') {
      throw new Error('Redis set error')
    }

    return { accessToken, refreshToken }
  }

  async generateAuthTokens(payload: AuthPayload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.authConfig.AUTH_JWT_ACCESS_TOKEN_SECRET,
      expiresIn: this.authConfig.AUTH_JWT_ACCESS_TOKEN_EXPIRE_SECONDS,
    })

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.authConfig.AUTH_JWT_REFRESH_TOKEN_SECRET,
      expiresIn: this.authConfig.AUTH_JWT_REFRESH_TOKEN_EXPIRE_SECONDS,
    })

    return { accessToken, refreshToken }
  }
}
