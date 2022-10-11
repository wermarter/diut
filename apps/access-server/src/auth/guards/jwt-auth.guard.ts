import { AuthGuard } from '@nestjs/passport'
import { Injectable, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { IS_PUBLIC_KEY, JWT_STRATEGY_KEY } from '../auth.common'

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_STRATEGY_KEY) {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic === true) {
      return true
    }

    return super.canActivate(context)
  }
}
