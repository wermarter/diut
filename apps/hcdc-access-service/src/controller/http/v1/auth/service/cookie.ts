import { NodeEnv } from '@diut/common'
import { Inject } from '@nestjs/common'
import { CookieOptions, Request, Response } from 'express'
import {
  AppConfig,
  AuthConfig,
  loadAppConfig,
  loadAuthConfig,
} from 'src/config'

const ACCESS_TOKEN_COOKIE = 'access_token'
const REFRESH_TOKEN_COOKIE = 'refresh_token'

export type AuthCookies = {
  accessToken: string
  refreshToken: string
}

export class AuthCookieService {
  constructor(
    @Inject(loadAppConfig.KEY)
    private readonly appConfig: AppConfig,
    @Inject(loadAuthConfig.KEY)
    private readonly authConfig: AuthConfig,
  ) {}

  private makeCookieOptions(options?: CookieOptions): CookieOptions {
    const isDevelopment = this.appConfig.NODE_ENV === NodeEnv.Development

    return {
      httpOnly: true,
      secure: !isDevelopment,
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
}
