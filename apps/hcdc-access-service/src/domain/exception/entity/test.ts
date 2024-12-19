import { DomainErrorCode } from '@diut/hcdc'
import { HttpStatus } from '@nestjs/common'
import { EEntity } from './base'

export class EEntityTestInvalidBioProduct extends EEntity {
  constructor(reason: string) {
    super(
      DomainErrorCode.ENTITY_TEST_INVALID_BIO_PRODUCT,
      `BioProduct testId is not the same: ${reason}`,
      undefined,
      HttpStatus.BAD_REQUEST,
    )
  }
}
