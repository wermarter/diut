import { AuthGuard } from '@nestjs/passport'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import {} from 'passport-jwt'

import { JWT_STRATEGY_KEY, SKIP_JWT_KEY } from '../common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class JwtGuard
  extends AuthGuard(JWT_STRATEGY_KEY)
  implements CanActivate
{
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const shouldSkip = this.reflector.getAllAndOverride<boolean>(SKIP_JWT_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (shouldSkip === true) {
      return true
    }

    return super.canActivate(context)
  }
}
