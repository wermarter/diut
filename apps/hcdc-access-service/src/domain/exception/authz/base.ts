import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/hcdc'

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
  constructor(cause?: unknown) {
    super(
      DomainErrorCode.AUTHZ_AUTHENTICATION_REQUIRED,
      'authentication required',
      cause,
      HttpStatus.UNAUTHORIZED,
    )
  }
}
