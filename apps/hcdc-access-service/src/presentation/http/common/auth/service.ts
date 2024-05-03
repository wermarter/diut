import { NodeEnv } from '@diut/common'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CookieOptions, Response, Request } from 'express'

import {
  AppConfig,
  AuthConfig,
  loadAppConfig,
  loadAuthConfig,
} from 'src/config'
import {
  AuthContextData,
  AuthPayloadInternal,
  AuthType,
  CacheKeyFactory,
  CachePrimaryServiceToken,
  CacheSecondaryServiceToken,
  EAuthnJwtInvalidToken,
  EAuthzContextInvalid,
  IAuthService,
  ICachePrimaryService,
  ICacheSecondaryService,
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

const REFRESH_TOKEN_TASK_TIMEOUT_SECONDS = 5

@Injectable()
export class HttpAuthService implements IAuthService {
  private readonly logger = new Logger(HttpAuthService.name)

  constructor(
    private readonly jwtService: JwtService,
    @Inject(loadAuthConfig.KEY)
    private readonly authConfig: AuthConfig,
    @Inject(loadAppConfig.KEY)
    private readonly appConfig: AppConfig,
    @Inject(CachePrimaryServiceToken)
    private readonly cacheService: ICachePrimaryService,
    @Inject(CacheSecondaryServiceToken)
    private readonly cacheSecondaryService: ICacheSecondaryService,
  ) {}

  async invalidate(input: AuthContextData) {
    if (input.type !== AuthType.Internal) {
      throw new EAuthzContextInvalid(`type=${input.type}`)
    }

    const stream = this.cacheService.client.scanStream({
      match: CacheKeyFactory.activeRefreshToken(input.user._id, '*'),
    })

    for await (const keys of stream) {
      for (const key of keys) {
        const refreshToken = key.match(
          CacheKeyFactory.activeRefreshToken(input.user._id, '(.+)'),
        )![1] as string

        await this.setBlacklisted(refreshToken)
        await this.cacheService.client.del(key)
      }
    }

    await this.cacheService.client.del(
      CacheKeyFactory.authContextInfo(input.user._id),
    )

    await this.cacheService.synchronize()
  }

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
      return await this.jwtService.verifyAsync<AuthPayloadInternal>(
        accessToken,
        {
          secret: this.authConfig.AUTH_JWT_ACCESS_TOKEN_SECRET,
        },
      )
    } catch (error) {
      this.logger.error(error)
      return null
    }
  }

  async verifyRefreshToken(refreshToken: string) {
    try {
      return await this.jwtService.verifyAsync<AuthPayloadInternal>(
        refreshToken,
        {
          secret: this.authConfig.AUTH_JWT_REFRESH_TOKEN_SECRET,
        },
      )
    } catch (error) {
      this.logger.error(error)
      return null
    }
  }

  async refreshTokenPair(response: Response, currentRefreshToken: string) {
    const payload = await this.verifyRefreshToken(currentRefreshToken)

    if (await this.checkBlacklisted(currentRefreshToken)) {
      this.clearAuthCookie(response)
      throw new EAuthnJwtInvalidToken()
    }

    if (payload === null) {
      throw new EAuthnJwtInvalidToken()
    }
    // @ts-ignore
    delete payload.iat
    // @ts-ignore
    const exp = payload.exp
    // @ts-ignore
    delete payload.exp

    const cacheKey = CacheKeyFactory.refreshTokenTask(currentRefreshToken)
    const rv = await this.cacheSecondaryService.client.get(cacheKey)
    if (rv !== null) {
      return JSON.parse(rv) as RefreshTokenTaskResult
    }

    return this.cacheService.mutex(
      `refreshTokenPair:currentRefreshToken:${currentRefreshToken}`,
      REFRESH_TOKEN_TASK_TIMEOUT_SECONDS,
      async (signal) => {
        const rv = await this.cacheService.client.get(cacheKey)
        if (rv !== null) {
          return JSON.parse(rv) as RefreshTokenTaskResult
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
        const result: RefreshTokenTaskResult = {
          accessToken,
          refreshToken,
        }

        if (signal.aborted === false) {
          const rv = await this.cacheService.client.set(
            cacheKey,
            JSON.stringify(<RefreshTokenTaskResult>{
              accessToken,
              refreshToken,
            }),
            'EX',
            expiresIn,
            'NX',
          )
          if (rv !== 'OK') {
            throw new Error('task result existed')
          }
          return result
        } else {
          throw new Error('mutex aborted')
        }
      },
    )
  }

  async generateAuthTokens(payload: AuthPayloadInternal) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.authConfig.AUTH_JWT_ACCESS_TOKEN_SECRET,
      expiresIn: this.authConfig.AUTH_JWT_ACCESS_TOKEN_EXPIRE_SECONDS,
    })

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.authConfig.AUTH_JWT_REFRESH_TOKEN_SECRET,
      expiresIn: this.authConfig.AUTH_JWT_REFRESH_TOKEN_EXPIRE_SECONDS,
    })

    // keep track for invalidation
    await this.cacheService.client.set(
      CacheKeyFactory.activeRefreshToken(payload.userId, refreshToken),
      '1',
      'EX',
      this.authConfig.AUTH_JWT_REFRESH_TOKEN_EXPIRE_SECONDS,
    )

    return { accessToken, refreshToken }
  }

  async checkBlacklisted(refreshToken: string) {
    const rv = await this.cacheSecondaryService.client.exists(
      CacheKeyFactory.refreshTokenBlacklist(refreshToken),
    )

    return rv !== 0
  }

  async setBlacklisted(refreshToken: string) {
    const rv = await this.cacheService.client.set(
      CacheKeyFactory.refreshTokenBlacklist(refreshToken),
      '1',
      'EX',
      this.authConfig.AUTH_JWT_REFRESH_TOKEN_EXPIRE_SECONDS, // can be more precise
      'NX',
    )

    if (rv === 'OK') {
      await this.cacheService.synchronize()
    } else {
      this.logger.warn('Refresh token blacklist existed')
    }
  }
}
