import { DomainErrorCode } from '@diut/hcdc'
import { HttpStatus } from '@nestjs/common'

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

export class EEntityPopulatePathUnknown extends EEntity {
  constructor(reason: string) {
    super(
      DomainErrorCode.ENTITY_POPULATE_PATH_UNKNOWN,
      `populate path unknown: ${reason}`,
      undefined,
      HttpStatus.BAD_REQUEST,
    )
  }
}

export class EEntityCannotDelete extends EEntity {
  constructor(reason: string) {
    super(
      DomainErrorCode.ENTITY_CANNOT_DELETE,
      `cannot delete: ${reason}`,
      undefined,
      HttpStatus.BAD_REQUEST,
    )
  }
}
