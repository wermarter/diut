import { IntersectionType } from '@nestjs/swagger'
import { BaseResourceResponseDto } from '@diut/nest-core'

import { BranchCreateRequestDto } from './create.request-dto'

export class BranchResponseDto extends IntersectionType(
  BaseResourceResponseDto,
  BranchCreateRequestDto,
) {}
