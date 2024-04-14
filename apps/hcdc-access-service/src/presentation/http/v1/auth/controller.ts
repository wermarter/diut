import { Body, Res } from '@nestjs/common'
import { Response } from 'express'

import { AuthMeUseCase, AuthLoginUseCase } from 'src/app'
import { AuthLoginRequestDto } from './dto/login.request-dto'
import { authRoutes } from './routes'
import {
  AuthCookieService,
  HttpController,
  HttpPublicRoute,
  HttpRoute,
} from '../../common'

@HttpController({ basePath: 'v1/auth' })
export class AuthController {
  constructor(
    private authMeUseCase: AuthMeUseCase,
    private authLoginUseCase: AuthLoginUseCase,
    private authCookieService: AuthCookieService,
  ) {}

  @HttpRoute(authRoutes.login)
  @HttpPublicRoute
  async login(
    @Body() body: AuthLoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, accessToken, compiledPermissions } =
      await this.authLoginUseCase.execute(body)

    this.authCookieService.setAuthCookie(res, { accessToken })

    return { user, permissions: compiledPermissions }
  }

  @HttpRoute(authRoutes.me)
  me() {
    return this.authMeUseCase.execute()
  }

  @HttpRoute(authRoutes.logout)
  logout(@Res({ passthrough: true }) res: Response): void {
    this.authCookieService.clearAuthCookie(res)
  }
}
