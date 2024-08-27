import { SearchRequestDto, PaginatedResponse } from '@diut/nestjs-infra'
import { Instrument } from '@diut/hcdc'

import { InstrumentResponseDto } from './response-dto'

export class InstrumentSearchRequestDto extends SearchRequestDto<Instrument> {}

export class InstrumentSearchResponseDto extends PaginatedResponse(
  InstrumentResponseDto,
) {}
