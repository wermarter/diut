import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/hcdc-common'

import { EAuthz } from './base'

export class EAuthzPermissionDeny extends EAuthz {
  constructor(message: string) {
    super(
      DomainErrorCode.AUTHZ_PERMISSION_DENY,
      `Permission denied: ${message}`,
      undefined,
      HttpStatus.FORBIDDEN,
    )
  }
}
