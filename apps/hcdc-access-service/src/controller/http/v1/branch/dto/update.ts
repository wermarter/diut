import { PartialType } from '@nestjs/swagger'
import { BranchRequestDto } from './request-dto'

export class BranchUpdateRequestDto extends PartialType(BranchRequestDto) {}
