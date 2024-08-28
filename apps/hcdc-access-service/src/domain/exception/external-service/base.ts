import { DomainErrorCode } from '@diut/hcdc'
import { HttpStatus } from '@nestjs/common'

import { EDomain } from '../base'

export class EExternalService extends EDomain {
  constructor(errorCode?: DomainErrorCode, message?: string, cause?: unknown) {
    super(
      errorCode ?? DomainErrorCode.EXTERNAL_SERVICE,
      message,
      cause,
      HttpStatus.FAILED_DEPENDENCY,
    )
  }
}
