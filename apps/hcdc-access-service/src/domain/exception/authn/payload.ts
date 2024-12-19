import { DomainErrorCode } from '@diut/hcdc'
import { HttpStatus } from '@nestjs/common'
import { EAuthn } from './base'

export class EAuthnPayloadInvalid extends EAuthn {
  constructor() {
    super(
      DomainErrorCode.AUTHN_PAYLOAD_INVALID,
      'auth payload invalid',
      undefined,
      HttpStatus.BAD_REQUEST,
    )
  }
}
