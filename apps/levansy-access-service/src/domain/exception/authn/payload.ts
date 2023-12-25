import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/levansy-common'

import { EAuthn } from './base'

export class EAuthnPayloadNotFound extends EAuthn {
  constructor() {
    super(
      DomainErrorCode.AUTHN_PAYLOAD_NOT_FOUND,
      'Payload not found',
      undefined,
      HttpStatus.BAD_REQUEST,
    )
  }
}
