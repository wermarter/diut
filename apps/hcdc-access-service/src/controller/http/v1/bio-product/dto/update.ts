import { PartialType } from '@nestjs/swagger'

import { BioProductRequestDto } from './request-dto'

export class BioProductUpdateRequestDto extends PartialType(
  BioProductRequestDto,
) {}
