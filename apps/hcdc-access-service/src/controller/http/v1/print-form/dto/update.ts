import { PartialType } from '@nestjs/swagger'
import { PrintFormRequestDto } from './request-dto'

export class PrintFormUpdateRequestDto extends PartialType(
  PrintFormRequestDto,
) {}
