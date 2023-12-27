import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/levansy-common'

import { EDomain } from '../base'

export class EAuthz extends EDomain {
  constructor(
    errorCode?: DomainErrorCode,
    message?: string,
    cause?: unknown,
    httpStatus?: HttpStatus,
  ) {
    super(errorCode ?? DomainErrorCode.AUTHZ, message, cause, httpStatus)
  }
}

export class EAuthzAuthenticationRequired extends EAuthz {
  constructor() {
    super(
      DomainErrorCode.AUTHZ_AUTHENTICATION_REQUIRED,
      'Authentication required',
      undefined,
      HttpStatus.UNAUTHORIZED,
    )
  }
}
