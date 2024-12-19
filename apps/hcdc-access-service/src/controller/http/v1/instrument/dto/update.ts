import { PartialType } from '@nestjs/swagger'
import { InstrumentRequestDto } from './request-dto'

export class InstrumentUpdateRequestDto extends PartialType(
  InstrumentRequestDto,
) {}
