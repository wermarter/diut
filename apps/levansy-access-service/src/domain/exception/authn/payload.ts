import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/levansy-common'

import { EAuthn } from './base'

export class EAuthnPayloadNotFound extends EAuthn {
  constructor() {
    super(
      DomainErrorCode.AUTHN_PAYLOAD_NOT_FOUND,
      'Auth payload not found',
      undefined,
      HttpStatus.BAD_REQUEST,
    )
  }
}

export class EAuthnPayloadUserNotFound extends EAuthn {
  constructor() {
    super(
      DomainErrorCode.AUTHN_PAYLOAD_USER_NOT_FOUND,
      'User not found, HttpPublicRoute is used where it should not be?',
      undefined,
      HttpStatus.BAD_REQUEST,
    )
  }
}
