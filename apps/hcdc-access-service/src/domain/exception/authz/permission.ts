import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/hcdc-common'

import { EAuthz } from './base'

export class EAuthzPermissionDenied extends EAuthz {
  constructor(message?: string) {
    super(
      DomainErrorCode.AUTHZ_PERMISSION_DENIED,
      `Permission denied${message?.length! > 0 ? `: ${message}` : ''}`,
      undefined,
      HttpStatus.FORBIDDEN,
    )
  }
}
