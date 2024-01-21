import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/hcdc-common'

import { EEntity } from './base'

export class EEntityNotFound extends EEntity {
  constructor(reason: string) {
    super(
      DomainErrorCode.ENTITY_NOT_FOUND,
      `entity not found: ${reason}`,
      undefined,
      HttpStatus.NOT_FOUND,
    )
  }
}
