import { PaginatedResponse } from '@diut/nestjs-core'

import { InstrumentResponseDto } from './response-dto'

export class InstrumentSearchResponseDto extends PaginatedResponse(
  InstrumentResponseDto,
) {}
