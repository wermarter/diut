import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/hcdc-common'

import { EAuthn } from './base'

export class EAuthnJwtInvalidToken extends EAuthn {
  constructor() {
    super(
      DomainErrorCode.AUTHN_JWT_INVALID_TOKEN,
      'Invalid JWT token',
      undefined,
      HttpStatus.UNAUTHORIZED,
    )
  }
}
