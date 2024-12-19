import { DomainErrorCode } from '@diut/hcdc'
import { HttpStatus } from '@nestjs/common'
import { ERequest } from './base'

export class ERequestInvalidInput extends ERequest {
  constructor(reason: string) {
    super(
      DomainErrorCode.REQUEST_INVALID_INPUT,
      `invalid input: ${reason}`,
      undefined,
      HttpStatus.BAD_REQUEST,
    )
  }
}
