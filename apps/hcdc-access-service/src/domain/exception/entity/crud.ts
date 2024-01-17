import { HttpStatus } from '@nestjs/common'
import { DomainErrorCode } from '@diut/hcdc-common'

import { EEntity } from './base'

export class EEntityNotFound extends EEntity {
  constructor(entity: unknown) {
    super(
      DomainErrorCode.ENTITY_NOT_FOUND,
      `Cannot find entity: ${JSON.stringify(entity)}`,
      undefined,
      HttpStatus.NOT_FOUND,
    )
  }
}
