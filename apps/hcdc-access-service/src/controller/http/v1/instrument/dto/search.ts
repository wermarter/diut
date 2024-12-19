import { Instrument } from '@diut/hcdc'
import { PaginatedResponse, SearchRequestDto } from '@diut/nestjs-infra'
import { InstrumentResponseDto } from './response-dto'

export class InstrumentSearchRequestDto extends SearchRequestDto<Instrument> {}

export class InstrumentSearchResponseDto extends PaginatedResponse(
  InstrumentResponseDto,
) {}
