import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  Scope,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { AuthContextToken, IAuthContext } from 'src/domain'
import { SKIP_JWT_KEY } from './common'

@Injectable({ scope: Scope.REQUEST })
export class AuthInterceptor implements NestInterceptor<unknown> {
  constructor(
    @Inject(AuthContextToken) private authContext: IAuthContext,
    private reflector: Reflector,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler<unknown>) {
    const shouldSkip = this.reflector.getAllAndOverride<boolean>(SKIP_JWT_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (shouldSkip === true) {
      return next.handle()
    }

    await this.authContext.populateContextData(context)

    return next.handle()
  }
}
