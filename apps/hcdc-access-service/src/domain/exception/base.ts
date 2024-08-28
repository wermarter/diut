import { DomainErrorCode } from '@diut/hcdc'
import { HttpStatus } from '@nestjs/common'

export class EDomain extends Error {
  errorCode: DomainErrorCode
  httpStatus?: HttpStatus

  constructor(
    errorCode: DomainErrorCode,
    message?: string,
    cause?: unknown,
    httpStatus?: HttpStatus,
  ) {
    super(message, { cause })

    this.errorCode = errorCode
    this.httpStatus = httpStatus
  }
}

export class EUnknown extends EDomain {
  constructor(message?: string, cause?: unknown) {
    super(
      DomainErrorCode.UNKNOWN,
      message,
      cause,
      HttpStatus.INTERNAL_SERVER_ERROR,
    )
  }
}
