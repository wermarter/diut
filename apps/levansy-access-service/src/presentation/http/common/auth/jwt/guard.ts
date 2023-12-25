import { AuthGuard } from '@nestjs/passport'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { firstValueFrom, isObservable } from 'rxjs'

import { AUTH_JWT_STRATEGY_KEY } from './common'
import { EAuthnInvalidJwtToken, EUnknown, EDomain } from 'src/domain'
import { HTTP_PUBLIC_ROUTE } from '../common'

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
      HTTP_PUBLIC_ROUTE,
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
      if (e instanceof EDomain) {
        throw e
      }
      if (e instanceof UnauthorizedException) {
        isValid = false
      } else {
        throw new EUnknown('passport jwt guard failed', e)
      }
    }

    if (isValid === false) {
      throw new EAuthnInvalidJwtToken()
    }

    return true
  }
}
