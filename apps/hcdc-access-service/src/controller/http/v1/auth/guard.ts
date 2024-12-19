import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request, Response } from 'express'
import { AuthGetContextInternalUseCase } from 'src/app/auth/use-case/get-context-internal'
import {
  AUTH_CONTEXT_TOKEN,
  EAuthnCookieNotFound,
  EAuthnJwtInvalidToken,
  IAuthContext,
} from 'src/domain'
import { METADATA_HTTP_PUBLIC_ROUTE } from '../../shared'
import { AuthCookieService } from './service/cookie'
import { AuthTokenService } from './service/token'

@Injectable()
export class HttpAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly tokenService: AuthTokenService,
    private readonly cookieService: AuthCookieService,
    private readonly authGetContextInternalUseCase: AuthGetContextInternalUseCase,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>()
    const response = context.switchToHttp().getResponse<Response>()
    const shouldSkip = this.reflector.getAllAndOverride<boolean>(
      METADATA_HTTP_PUBLIC_ROUTE,
      [context.getHandler(), context.getClass()],
    )
    if (shouldSkip === true) {
      return true
    }

    let { accessToken, refreshToken } =
      this.cookieService.getAuthCookie(request)
    if (!refreshToken) {
      throw new EAuthnCookieNotFound()
    }

    if (!accessToken) {
      const newTokens = await this.tokenService.refreshTokenPair(
        response,
        refreshToken,
      )
      this.cookieService.setAuthCookie(response, newTokens)
      accessToken = newTokens.accessToken
      refreshToken = newTokens.refreshToken
    }

    const payload = await this.tokenService.verifyAccessToken(accessToken!)
    if (payload === null) {
      throw new EAuthnJwtInvalidToken()
    }

    const authContextData =
      await this.authGetContextInternalUseCase.execute(payload)

    this.authContext.setData({
      ...authContextData,
      accessToken,
      refreshToken,
    })

    return true
  }
}
