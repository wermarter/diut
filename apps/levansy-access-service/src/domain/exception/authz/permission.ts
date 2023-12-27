import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/levansy-common'

import { EAuthz } from './base'

export class EAuthzPermissionDeny extends EAuthz {
  constructor() {
    super(
      DomainErrorCode.AUTHZ_PERMISSION_DENY,
      'Permission deny',
      undefined,
      HttpStatus.UNAUTHORIZED,
    )
  }
}
