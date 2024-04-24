import { Body, Res } from '@nestjs/common'
import { Response } from 'express'

import { AuthMeUseCase, AuthLoginUseCase } from 'src/app'
import { AuthLoginRequestDto } from './dto/login.request-dto'
import { authRoutes } from './routes'
import {
  HttpAuthService,
  HttpController,
  HttpPublicRoute,
  HttpRoute,
} from '../../common'

@HttpController({ basePath: 'v1/auth' })
export class AuthController {
  constructor(
    private authMeUseCase: AuthMeUseCase,
    private authLoginUseCase: AuthLoginUseCase,
    private authCookieService: HttpAuthService,
  ) {}

  @HttpRoute(authRoutes.login)
  @HttpPublicRoute
  async login(
    @Body() body: AuthLoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, compiledPermissions } =
      await this.authLoginUseCase.execute(body)

    const tokens = await this.authCookieService.generateAuthTokens({
      userId: user._id,
    })
    this.authCookieService.setAuthCookie(res, tokens)

    return { user, permissions: compiledPermissions }
  }

  @HttpRoute(authRoutes.me)
  me() {
    return this.authMeUseCase.execute()
  }

  @HttpRoute(authRoutes.logout)
  logout(@Res({ passthrough: true }) res: Response): void {
    this.authCookieService.clearAuthCookie(res)
    this.authCookieService.setBlacklisted(res.locals.refreshToken)
  }
}
