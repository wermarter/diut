import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/levansy-common'

import { EAuthz } from './base'

export class EAuthzPayloadNotFound extends EAuthz {
  constructor() {
    super(
      DomainErrorCode.AUTHZ_PAYLOAD_NOT_FOUND,
      'Auth payload not found',
      undefined,
      HttpStatus.BAD_REQUEST,
    )
  }
}

export class EAuthzUserNotFound extends EAuthz {
  constructor() {
    super(
      DomainErrorCode.AUTHZ_USER_NOT_FOUND,
      'User not found',
      undefined,
      HttpStatus.BAD_REQUEST,
    )
  }
}
