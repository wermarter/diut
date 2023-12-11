import { PartialType } from '@nestjs/swagger'

import { BioProductCreateRequestDto } from './create.request-dto'

export class BioProductUpdateRequestDto extends PartialType(
  BioProductCreateRequestDto,
) {}
