import { DomainErrorCode } from '@diut/hcdc'
import { HttpStatus } from '@nestjs/common'

import { EEntity } from './base'

export class EEntitySampleIdAlreadyExists extends EEntity {
  constructor(reason: string) {
    super(
      DomainErrorCode.ENTITY_SAMPLE_ID_ALREADY_EXISTS,
      `sample ID already exists: ${reason}`,
      undefined,
      HttpStatus.BAD_REQUEST,
    )
  }
}
