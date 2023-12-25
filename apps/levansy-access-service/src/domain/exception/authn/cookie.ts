import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/levansy-common'

import { EAuthn } from './base'

export class EAuthnAccessTokenCookieExpired extends EAuthn {
  constructor() {
    super(
      DomainErrorCode.AUTHN_ACCESS_TOKEN_COOKIE_EXPIRED,
      'Access token cookie expired',
      undefined,
      HttpStatus.UNAUTHORIZED,
    )
  }
}
