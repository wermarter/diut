import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  Scope,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { AuthorizationContextToken, IAuthorizationContext } from 'src/domain'
// import { SKIP_JWT_KEY } from './common'

@Injectable({ scope: Scope.REQUEST })
export class AuthorizationInterceptor implements NestInterceptor<unknown> {
  constructor(
    @Inject(AuthorizationContextToken)
    private authorizationContext: IAuthorizationContext,
    private reflector: Reflector,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler<unknown>) {
    // const shouldSkip = this.reflector.getAllAndOverride<boolean>(SKIP_JWT_KEY, [
    //   context.getHandler(),
    //   context.getClass(),
    // ])

    // if (shouldSkip === true) {
    //   return next.handle()
    // }

    await this.authorizationContext.prepareData(context)

    return next.handle()
  }
}
