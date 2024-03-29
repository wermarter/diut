import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { AuthContextToken, AuthPayload, IAuthContext } from 'src/domain'
import { HTTP_PUBLIC_ROUTE } from './common'
import { AuthPopulateContextUseCase } from 'src/app'

@Injectable()
export class HttpAuthContextGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authPopulateContextUseCase: AuthPopulateContextUseCase,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Express.Request>()

    const shouldSkip = this.reflector.getAllAndOverride<boolean>(
      HTTP_PUBLIC_ROUTE,
      [context.getHandler(), context.getClass()],
    )

    if (!shouldSkip) {
      const authContextData = await this.authPopulateContextUseCase.execute(
        request.user as AuthPayload,
      )
      this.authContext.setData(authContextData)
    }

    return true
  }
}
