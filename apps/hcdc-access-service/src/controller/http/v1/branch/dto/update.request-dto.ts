import { PartialType } from '@nestjs/swagger'

import { BranchCreateRequestDto } from './create.request-dto'

export class BranchUpdateRequestDto extends PartialType(
  BranchCreateRequestDto,
) {}
