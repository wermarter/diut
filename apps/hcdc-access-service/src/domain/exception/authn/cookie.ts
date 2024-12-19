import { DomainErrorCode } from '@diut/hcdc'
import { HttpStatus } from '@nestjs/common'
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
