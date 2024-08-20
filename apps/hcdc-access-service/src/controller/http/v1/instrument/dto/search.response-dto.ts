import { PaginatedResponse } from '@diut/nestjs-infra'

import { InstrumentResponseDto } from './response-dto'

export class InstrumentSearchResponseDto extends PaginatedResponse(
  InstrumentResponseDto,
) {}
