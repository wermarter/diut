import { HttpStatus } from '@nestjs/common'

import { EDomain } from '../base'

export class EService extends EDomain {
  constructor(
    errorCode?: string,
    message?: string,
    cause?: unknown,
    httpStatus?: HttpStatus,
  ) {
    super(errorCode ?? 'E4000', message, cause, httpStatus)
  }
}
