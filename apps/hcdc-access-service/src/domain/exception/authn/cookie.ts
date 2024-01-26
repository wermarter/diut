import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/hcdc-common'

import { EAuthn } from './base'

export class EAuthnCookieAccessTokenNotFound extends EAuthn {
  constructor() {
    super(
      DomainErrorCode.AUTHN_COOKIE_ACCESS_TOKEN_NOT_FOUND,
      'access token cookie not found',
      undefined,
      HttpStatus.UNAUTHORIZED,
    )
  }
}