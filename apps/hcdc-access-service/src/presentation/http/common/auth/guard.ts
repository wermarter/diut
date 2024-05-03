import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request, Response } from 'express'

import {
  AuthContextToken,
  EAuthnCookieNotFound,
  EAuthnJwtInvalidToken,
  IAuthContext,
} from 'src/domain'
import { HTTP_PUBLIC_ROUTE } from './common'
import { AuthGetContextInternalUseCase } from 'src/app'
import { HttpAuthService } from './service'

@Injectable()
export class HttpAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly authService: HttpAuthService,
    private readonly authGetContextInternalUseCase: AuthGetContextInternalUseCase,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>()
    const response = context.switchToHttp().getResponse<Response>()
    const shouldSkip = this.reflector.getAllAndOverride<boolean>(
      HTTP_PUBLIC_ROUTE,
      [context.getHandler(), context.getClass()],
    )
    if (shouldSkip === true) {
      return true
    }

    let { accessToken, refreshToken } = this.authService.getAuthCookie(request)
    if (!refreshToken) {
      throw new EAuthnCookieNotFound()
    }

    if (!accessToken) {
      const newTokens = await this.authService.refreshTokenPair(
        response,
        refreshToken,
      )
      this.authService.setAuthCookie(response, newTokens)
      accessToken = newTokens.accessToken
      refreshToken = newTokens.refreshToken
    }

    const payload = await this.authService.verifyAccessToken(accessToken)
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
