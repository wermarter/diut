import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ClsService } from 'nestjs-cls'

import { AuthPayload } from 'src/domain'
import { HTTP_PUBLIC_ROUTE } from './common'
import { AuthPopulateContextUseCase } from 'src/app'

@Injectable()
export class HttpAuthContextGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authPopulateContextUseCase: AuthPopulateContextUseCase,
    private readonly cls: ClsService,
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
      this.cls.set('authContextData', authContextData)
    }

    return true
  }
}
