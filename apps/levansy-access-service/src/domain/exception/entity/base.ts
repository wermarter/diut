import { HttpStatus } from '@nestjs/common'

import { EDomain } from '../base'

export class EEntity extends EDomain {
  constructor(
    errorCode?: string,
    message?: string,
    cause?: unknown,
    httpStatus?: HttpStatus,
  ) {
    super(errorCode ?? 'E3000', message, cause, httpStatus)
  }
}
