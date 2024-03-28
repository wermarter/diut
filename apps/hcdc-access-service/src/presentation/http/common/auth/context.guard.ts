import { CanActivate, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ClsGuard } from 'nestjs-cls'

import { AuthPayload } from 'src/domain'
import { HTTP_PUBLIC_ROUTE } from './common'
import { AuthPopulateContextUseCase } from 'src/app'

@Injectable()
export class HttpAuthContextGuard extends ClsGuard implements CanActivate {
  constructor(
    readonly empty: unknown, // TODO
    readonly authPopulateContextUseCase: AuthPopulateContextUseCase,
    readonly reflector: Reflector,
  ) {
    super({
      setup: async (cls, context) => {
        const request = context.switchToHttp().getRequest<Express.Request>()

        console.log({
          reflector,
          empty,
          authPopulateContextUseCase,
        })

        const shouldSkip = reflector.getAllAndOverride<boolean>(
          HTTP_PUBLIC_ROUTE,
          [context.getHandler(), context.getClass()],
        )

        if (!shouldSkip) {
          const authContextData = await authPopulateContextUseCase.execute(
            request.user as AuthPayload,
          )
          cls.set('authContextData', authContextData)
        }
      },
    })
  }
}
