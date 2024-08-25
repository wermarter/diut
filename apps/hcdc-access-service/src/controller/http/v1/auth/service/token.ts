import { Inject, Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'

import { AuthConfig, loadAuthConfig } from 'src/config'
import {
  AUTH_CACHE_SERVICE_TOKEN,
  AuthPayloadInternal,
  EAuthnJwtInvalidToken,
  IAuthCacheService,
  IMutexService,
  MUTEX_SERVICE_TOKEN,
  RefreshTokenTaskResult,
} from 'src/domain'
import { AuthCookieService } from './cookie'

const REFRESH_TOKEN_TASK_TIMEOUT_SECONDS = 5

@Injectable()
export class AuthTokenService {
  private readonly logger = new Logger(this.constructor.name)

  constructor(
    private readonly jwtService: JwtService,
    @Inject(loadAuthConfig.KEY)
    private readonly authConfig: AuthConfig,
    @Inject(AUTH_CACHE_SERVICE_TOKEN)
    private readonly authCacheService: IAuthCacheService,
    @Inject(MUTEX_SERVICE_TOKEN)
    private readonly mutexService: IMutexService,
    private readonly cookieService: AuthCookieService,
  ) {}

  async verifyAccessToken(accessToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<AuthPayloadInternal>(
        accessToken,
        {
          secret: this.authConfig.AUTH_JWT_ACCESS_TOKEN_SECRET,
        },
      )
      return payload
    } catch (error) {
      this.logger.error(error)
      return null
    }
  }

  async verifyRefreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<AuthPayloadInternal>(
        refreshToken,
        {
          secret: this.authConfig.AUTH_JWT_REFRESH_TOKEN_SECRET,
        },
      )
      return payload
    } catch (error) {
      this.logger.error(error)
      return null
    }
  }

  async refreshTokenPair(response: Response, currentRefreshToken: string) {
    const payload = await this.verifyRefreshToken(currentRefreshToken)

    if (
      await this.authCacheService.isRefreshTokenBlacklisted(currentRefreshToken)
    ) {
      this.cookieService.clearAuthCookie(response)
      throw new EAuthnJwtInvalidToken()
    }

    if (payload === null) {
      throw new EAuthnJwtInvalidToken()
    }

    let cachedResult =
      await this.authCacheService.getRefreshTokenTaskResult(currentRefreshToken)
    if (cachedResult !== null) {
      return cachedResult
    }

    return this.mutexService.mutex(
      `refreshTokenPair:currentRefreshToken:${currentRefreshToken}`,
      REFRESH_TOKEN_TASK_TIMEOUT_SECONDS,
      async (signal) => {
        cachedResult = await this.authCacheService.getRefreshTokenTaskResult(
          currentRefreshToken,
          true,
        )
        if (cachedResult !== null) {
          return cachedResult
        }

        // @ts-ignore
        delete payload.iat
        // @ts-ignore
        const exp = payload.exp
        // @ts-ignore
        delete payload.exp
        const expiresIn = exp - Math.ceil(Date.now() / 1000)

        const accessToken = await this.jwtService.signAsync(payload, {
          secret: this.authConfig.AUTH_JWT_ACCESS_TOKEN_SECRET,
          expiresIn: this.authConfig.AUTH_JWT_ACCESS_TOKEN_EXPIRE_SECONDS,
        })
        const refreshToken = await this.jwtService.signAsync(payload, {
          secret: this.authConfig.AUTH_JWT_REFRESH_TOKEN_SECRET,
          expiresIn,
        })

        if (signal.aborted === false) {
          const result: RefreshTokenTaskResult = {
            accessToken,
            refreshToken,
          }

          const isSetSuccess =
            await this.authCacheService.setRefreshTokenTaskResult(
              currentRefreshToken,
              result,
              expiresIn,
            )
          if (!isSetSuccess) {
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

    await this.authCacheService.setActiveRefreshToken(
      payload.userId,
      refreshToken,
      this.authConfig.AUTH_JWT_REFRESH_TOKEN_EXPIRE_SECONDS,
    )

    return { accessToken, refreshToken }
  }
}
