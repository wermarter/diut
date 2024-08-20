import { CanActivate, ExecutionContext, Inject } from '@nestjs/common'
import { createAbility } from '@diut/hcdc'
import { Request } from 'express'

import { HttpExternalAuthService } from './service'
import { AUTH_CONTEXT_TOKEN, AuthType, IAuthContext } from 'src/domain'

export class HttpExternalAuthGuard implements CanActivate {
  constructor(
    private readonly authService: HttpExternalAuthService,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>()
    const jwt = request.query.jwt as string
    if (!jwt) return false

    const payload = await this.authService.verifyToken(jwt)
    if (!payload) return false

    if (!request.path.startsWith(payload.authorizedRoute)) return false

    if (await this.authService.checkBlacklisted(jwt)) return false

    this.authContext.setData({
      ...payload,
      type: AuthType.External,
      jwt,
      ability: createAbility(payload.permissions),
    })

    return true
  }
}
