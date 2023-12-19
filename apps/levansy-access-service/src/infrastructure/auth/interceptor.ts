import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  Scope,
} from '@nestjs/common'

import { AuthContextToken, IAuthContext } from 'src/domain'

@Injectable({ scope: Scope.REQUEST })
export class AuthInterceptor implements NestInterceptor<unknown> {
  constructor(@Inject(AuthContextToken) private authContext: IAuthContext) {}

  async intercept(context: ExecutionContext, next: CallHandler<unknown>) {
    await this.authContext.ensureContextData(context)

    return next.handle()
  }
}
