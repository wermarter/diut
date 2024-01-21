import { IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'

import { BioProductCreateRequestDto } from './create.request-dto'

export class BioProductResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  BioProductCreateRequestDto,
) {}
