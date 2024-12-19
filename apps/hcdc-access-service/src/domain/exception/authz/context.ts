import { DomainErrorCode } from '@diut/hcdc'
import { HttpStatus } from '@nestjs/common'
import { EAuthz } from './base'

export class EAuthzContextInvalid extends EAuthz {
  constructor(reason: string) {
    super(
      DomainErrorCode.AUTHZ_CONTEXT_INVALID,
      `context invalid: ${reason}`,
      undefined,
      HttpStatus.FORBIDDEN,
    )
  }
}
