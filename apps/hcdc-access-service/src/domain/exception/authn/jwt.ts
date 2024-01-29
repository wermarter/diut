import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/hcdc'

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
