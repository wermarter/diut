import { DomainErrorCode } from '@diut/hcdc'
import { HttpStatus } from '@nestjs/common'

import { EAuthn } from './base'

export class EAuthnLoginInvalidUsername extends EAuthn {
  constructor() {
    super(
      DomainErrorCode.AUTHN_LOGIN_INVALID_USERNAME,
      'invalid username',
      undefined,
      HttpStatus.BAD_REQUEST,
    )
  }
}

export class EAuthnLoginInvalidPassword extends EAuthn {
  constructor() {
    super(
      DomainErrorCode.AUTHN_LOGIN_INVALID_PASSWORD,
      'invalid password',
      undefined,
      HttpStatus.BAD_REQUEST,
    )
  }
}
