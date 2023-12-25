import { AuthGuard } from '@nestjs/passport'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { firstValueFrom, isObservable } from 'rxjs'

import { AUTH_JWT_STRATEGY_KEY, SKIP_AUTH_JWT_GUARD } from './common'
import { EAuthnInvalidJwtToken, EUnknown } from 'src/domain'

@Injectable()
export class AuthJwtGuard
  extends AuthGuard(AUTH_JWT_STRATEGY_KEY)
  implements CanActivate
{
  constructor(private reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext) {
    const shouldSkip = this.reflector.getAllAndOverride<boolean>(
      SKIP_AUTH_JWT_GUARD,
      [context.getHandler(), context.getClass()],
    )

    if (shouldSkip === true) {
      return true
    }
    let isValid: boolean = false

    try {
      const canActivateReturnValue = super.canActivate(context)

      if (isObservable(canActivateReturnValue)) {
        isValid = await firstValueFrom(canActivateReturnValue)
      } else {
        isValid = await canActivateReturnValue
      }
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        isValid = false
      } else {
        throw new EUnknown('passport jwt guard failed', e)
      }
    }

    if (isValid === false) {
      throw new EAuthnInvalidJwtToken()
    }

    return isValid
  }
}
