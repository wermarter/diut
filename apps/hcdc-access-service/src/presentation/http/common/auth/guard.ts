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
import { AuthGetContextUseCase } from 'src/app'
import { HttpAuthService } from './service'

@Injectable()
export class HttpAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly httpAuthService: HttpAuthService,
    private readonly authGetContextUseCase: AuthGetContextUseCase,
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

    let { accessToken, refreshToken } =
      this.httpAuthService.getAuthCookie(request)
    if (!refreshToken) {
      throw new EAuthnCookieNotFound()
    }
    if (await this.httpAuthService.checkBlacklisted(refreshToken)) {
      throw new EAuthnJwtInvalidToken()
    }

    if (!accessToken) {
      const newTokens =
        await this.httpAuthService.refreshTokenPair(refreshToken)
      this.httpAuthService.setAuthCookie(response, newTokens)
      accessToken = newTokens.accessToken
      refreshToken = newTokens.refreshToken
    }

    const payload = await this.httpAuthService.verifyAccessToken(accessToken)
    if (payload === null) {
      throw new EAuthnJwtInvalidToken()
    }

    const authContextData = await this.authGetContextUseCase.execute(payload)
    this.authContext.setData(authContextData)

    // used for logout handler in auth controller
    response.locals.accessToken = accessToken
    response.locals.refreshToken = refreshToken

    return true
  }
}
