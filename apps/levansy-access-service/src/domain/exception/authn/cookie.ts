import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/levansy-common'

import { EAuthn } from './base'

export class EAuthnCookieAccessTokenNotFound extends EAuthn {
  constructor() {
    super(
      DomainErrorCode.AUTHN_COOKIE_ACCESS_TOKEN_NOT_FOUND,
      'Access token cookie not found',
      undefined,
      HttpStatus.UNAUTHORIZED,
    )
  }
}
