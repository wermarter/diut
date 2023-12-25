import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/levansy-common'

import { EDomain } from '../base'

export class EAuthn extends EDomain {
  constructor(
    errorCode?: DomainErrorCode,
    message?: string,
    cause?: unknown,
    httpStatus?: HttpStatus,
  ) {
    super(errorCode ?? DomainErrorCode.AUTHN, message, cause, httpStatus)
  }
}
