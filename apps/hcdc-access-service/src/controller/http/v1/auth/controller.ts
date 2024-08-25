import { Body, Inject, Res } from '@nestjs/common'
import { Response } from 'express'

import { AuthLoginRequestDto } from './dto/login.request-dto'
import { authRoutes } from './routes'
import { HttpController, HttpPublicRoute, HttpRoute } from '../../shared'
import {
  AUTH_CACHE_SERVICE_TOKEN,
  AUTH_CONTEXT_TOKEN,
  IAuthCacheService,
  IAuthContext,
} from 'src/domain'
import { AuthMeUseCase } from 'src/app/auth/use-case/me'
import { AuthLoginUseCase } from 'src/app/auth/use-case/login'
import { AuthCookieService } from './service/cookie'
import { AuthTokenService } from './service/token'
import { AuthConfig, loadAuthConfig } from 'src/config'

@HttpController({ basePath: 'auth' })
export class AuthController {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly authMeUseCase: AuthMeUseCase,
    private readonly authLoginUseCase: AuthLoginUseCase,
    private readonly cookieService: AuthCookieService,
    private readonly tokenService: AuthTokenService,
    @Inject(AUTH_CACHE_SERVICE_TOKEN)
    private readonly authCacheService: IAuthCacheService,
    @Inject(loadAuthConfig.KEY)
    private readonly authConfig: AuthConfig,
  ) {}

  @HttpRoute(authRoutes.login)
  @HttpPublicRoute
  async login(
    @Body() body: AuthLoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, compiledPermissions } =
      await this.authLoginUseCase.execute(body)

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user._id,
    })
    this.cookieService.setAuthCookie(res, tokens)

    return { user, permissions: compiledPermissions }
  }

  @HttpRoute(authRoutes.me)
  me() {
    return this.authMeUseCase.execute()
  }

  @HttpRoute(authRoutes.logout)
  logout(@Res({ passthrough: true }) res: Response): void {
    const { refreshToken } = this.authContext.getDataInternal()

    this.cookieService.clearAuthCookie(res)
    this.authCacheService.blacklistRefreshToken(
      refreshToken,
      this.authConfig.AUTH_JWT_REFRESH_TOKEN_EXPIRE_SECONDS,
    )
  }
}
