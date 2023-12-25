import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Scope,
} from '@nestjs/common'
import { Request as ExpressRequest } from 'express'

import { AuthPayload, AuthzContextToken, IAuthzContext } from 'src/domain'

@Injectable({ scope: Scope.REQUEST })
export class AuthzGuard implements CanActivate {
  constructor(
    @Inject(AuthzContextToken)
    private authorizationContext: IAuthzContext,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<ExpressRequest>()
    await this.authorizationContext.prepareData(request.user as AuthPayload)

    return true
  }
}
