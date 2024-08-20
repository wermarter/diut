import { PartialType } from '@nestjs/swagger'

import { InstrumentCreateRequestDto } from './create.request-dto'

export class InstrumentUpdateRequestDto extends PartialType(
  InstrumentCreateRequestDto,
) {}
