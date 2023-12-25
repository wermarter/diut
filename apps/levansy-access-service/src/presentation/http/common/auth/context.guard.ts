import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Scope,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { AuthPayload, AuthContextToken, IAuthContext } from 'src/domain'
import { HTTP_PUBLIC_ROUTE } from './common'

@Injectable({ scope: Scope.REQUEST })
export class AuthContextGuard implements CanActivate {
  constructor(
    @Inject(AuthContextToken)
    private authContext: IAuthContext,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Express.Request>()

    const shouldSkip = this.reflector.getAllAndOverride<boolean>(
      HTTP_PUBLIC_ROUTE,
      [context.getHandler(), context.getClass()],
    )

    if (shouldSkip === true) {
      return true
    }

    await this.authContext.prepareData(request.user as AuthPayload)

    return true
  }
}
