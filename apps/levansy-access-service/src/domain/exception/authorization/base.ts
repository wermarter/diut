import { HttpStatus } from '@nestjs/common'

import { EDomain } from '../base'

export class EAuthorization extends EDomain {
  constructor(
    errorCode?: string,
    message?: string,
    cause?: unknown,
    httpStatus?: HttpStatus,
  ) {
    super(errorCode ?? 'E2000', message, cause, httpStatus)
  }
}
