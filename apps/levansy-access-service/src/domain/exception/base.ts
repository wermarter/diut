import { HttpStatus } from '@nestjs/common'

export class EDomain extends Error {
  errorCode: string
  httpStatus?: HttpStatus

  constructor(
    errorCode: string,
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
    super('E0000', message, cause, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
