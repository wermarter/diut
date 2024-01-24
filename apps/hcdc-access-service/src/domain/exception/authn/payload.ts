import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/hcdc-common'

import { EAuthn } from './base'

export class EAuthnPayloadNotFound extends EAuthn {
  constructor() {
    super(
      DomainErrorCode.AUTHN_PAYLOAD_NOT_FOUND,
      'auth payload not found',
      undefined,
      HttpStatus.BAD_REQUEST,
    )
  }
}

export class EAuthnPayloadUserNotFound extends EAuthn {
  constructor() {
    super(
      DomainErrorCode.AUTHN_PAYLOAD_USER_NOT_FOUND,
      'user not found, HttpPublicRoute is applied where it should not be?',
      undefined,
      HttpStatus.UNAUTHORIZED,
    )
  }
}
