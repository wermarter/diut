import { Body, Inject, Res } from '@nestjs/common'
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
import { AUTH_CONTEXT_TOKEN, IAuthContext } from 'src/domain'

@HttpController({ basePath: 'v1/auth' })
export class AuthController {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private authMeUseCase: AuthMeUseCase,
    private authLoginUseCase: AuthLoginUseCase,
    private authService: HttpAuthService,
  ) {}

  @HttpRoute(authRoutes.login)
  @HttpPublicRoute
  async login(
    @Body() body: AuthLoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, compiledPermissions } =
      await this.authLoginUseCase.execute(body)

    const tokens = await this.authService.generateAuthTokens({
      userId: user._id,
    })
    this.authService.setAuthCookie(res, tokens)

    return { user, permissions: compiledPermissions }
  }

  @HttpRoute(authRoutes.me)
  me() {
    return this.authMeUseCase.execute()
  }

  @HttpRoute(authRoutes.logout)
  logout(@Res({ passthrough: true }) res: Response): void {
    const { refreshToken } = this.authContext.getDataInternal()

    this.authService.clearAuthCookie(res)
    this.authService.setBlacklisted(refreshToken)
  }
}
