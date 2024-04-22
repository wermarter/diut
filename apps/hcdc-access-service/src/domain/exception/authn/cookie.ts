import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/hcdc'

import { EAuthn } from './base'

export class EAuthnCookieNotFound extends EAuthn {
  constructor() {
    super(
      DomainErrorCode.AUTHN_COOKIE_NOT_FOUND,
      'cookie not found',
      undefined,
      HttpStatus.UNAUTHORIZED,
    )
  }
}
