import { DomainErrorCode } from '@diut/hcdc'
import { HttpStatus } from '@nestjs/common'

import { EAuthn } from './base'

export class EAuthnJwtInvalidToken extends EAuthn {
  constructor() {
    super(
      DomainErrorCode.AUTHN_JWT_INVALID_TOKEN,
      'invalid JWT token',
      undefined,
      HttpStatus.UNAUTHORIZED,
    )
  }
}
