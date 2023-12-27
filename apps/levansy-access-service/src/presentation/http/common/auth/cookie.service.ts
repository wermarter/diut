import { NodeEnv } from '@diut/common'
import { Inject, Injectable } from '@nestjs/common'
import { CookieOptions, Response, Request } from 'express'

import {
  AppConfig,
  AuthConfig,
  loadAppConfig,
  loadAuthConfig,
} from 'src/config'

export type AuthCookiePayload = {
  accessToken: string
}

@Injectable()
export class AuthCookieService {
  private readonly accessTokenCookieName: string

  constructor(
    @Inject(loadAuthConfig.KEY) private authConfig: AuthConfig,
    @Inject(loadAppConfig.KEY) private appConfig: AppConfig,
  ) {
    this.accessTokenCookieName = `${appConfig.SERVICE_NAME}-access_token`
  }

  private makeCookieOptions(): CookieOptions {
    const isDevelopment = this.appConfig.NODE_ENV === NodeEnv.Development

    return {
      signed: true,
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: 'lax',
      expires: new Date(
        Date.now() + parseInt(this.authConfig.AUTH_JWT_EXPIRE_SECONDS) * 1000,
      ),
    }
  }

  setAuthCookie(res: Response, cookiePayload: AuthCookiePayload) {
    this.clearAuthCookie(res)

    const cookieOptions = this.makeCookieOptions()
    res.cookie(
      this.accessTokenCookieName,
      cookiePayload.accessToken,
      cookieOptions,
    )
  }

  getAuthCookie(req: Request): Partial<AuthCookiePayload> {
    const accessToken = req.signedCookies[this.accessTokenCookieName]

    return { accessToken }
  }

  clearAuthCookie(res: Response) {
    res.clearCookie(this.accessTokenCookieName)
  }
}
