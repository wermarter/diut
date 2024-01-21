import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/hcdc-common'

import { EAuthz } from './base'

export class EAuthzPermissionDenied extends EAuthz {
  constructor(reason: string) {
    super(
      DomainErrorCode.AUTHZ_PERMISSION_DENIED,
      `permission denied: ${reason}`,
      undefined,
      HttpStatus.FORBIDDEN,
    )
  }
}
