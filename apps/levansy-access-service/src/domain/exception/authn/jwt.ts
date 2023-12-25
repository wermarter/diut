import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/levansy-common'

import { EAuthn } from './base'

export class EAuthnInvalidJwtToken extends EAuthn {
  constructor() {
    super(
      DomainErrorCode.AUTHN_INVALID_JWT_TOKEN,
      'Invalid JWT token',
      undefined,
      HttpStatus.UNAUTHORIZED,
    )
  }
}
