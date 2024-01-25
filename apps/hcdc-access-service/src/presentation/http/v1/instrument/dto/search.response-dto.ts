import { PaginatedResponse } from '@diut/nest-core'

import { InstrumentResponseDto } from './response-dto'

export class InstrumentSearchResponseDto extends PaginatedResponse(
  InstrumentResponseDto,
) {}
