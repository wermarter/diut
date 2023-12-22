import { HttpStatus } from '@nestjs/common'

import { EDomain } from '../base'

export class EAuthentication extends EDomain {
  constructor(
    errorCode?: string,
    message?: string,
    cause?: unknown,
    httpStatus?: HttpStatus,
  ) {
    super(errorCode ?? 'E1000', message, cause, httpStatus)
  }
}
