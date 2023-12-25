import { CustomHttpController, CustomHttpRoute } from '@diut/nest-core'
import { Body, Inject, Res } from '@nestjs/common'
import { omit } from 'lodash'
import { CookieOptions, Response } from 'express'

import { AuthMeUseCase, AuthLoginUseCase, EAuthzUserNotFound } from 'src/domain'
import { AuthLoginRequestDto } from './dto/login.request'
import { authRoutes } from './routes'
import { LoginResponseDto } from './dto/login.response'
import { AuthMeResponseDto } from './dto/me.response'
import { AUTH_JWT_ACCESS_TOKEN_COOKIE, HttpPublicRoute } from '../../common'
import {
  AppConfig,
  AuthConfig,
  loadAppConfig,
  loadAuthConfig,
} from 'src/config'
import { NodeEnv } from '@diut/common'

@CustomHttpController(authRoutes.controller)
export class AuthController {
  constructor(
    private authMeUseCase: AuthMeUseCase,
    private authLoginUseCase: AuthLoginUseCase,
    @Inject(loadAuthConfig.KEY) private authConfig: AuthConfig,
    @Inject(loadAppConfig.KEY) private appConfig: AppConfig,
  ) {}

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

  @CustomHttpRoute(authRoutes.login)
  @HttpPublicRoute
  async login(
    @Body() body: AuthLoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
    const { user, jwtAccessToken } = await this.authLoginUseCase.execute(body)
    const cookieOptions = this.makeCookieOptions()

    res.cookie(AUTH_JWT_ACCESS_TOKEN_COOKIE, jwtAccessToken, cookieOptions)

    return omit(user, 'password')
  }

  @CustomHttpRoute(authRoutes.me)
  async me(): Promise<AuthMeResponseDto> {
    const info = await this.authMeUseCase.execute()

    if (info === undefined) {
      throw new EAuthzUserNotFound()
    }

    return info
  }
}
