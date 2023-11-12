import { PaginatedResponse } from '@diut/server-core'
import { IndicationResponseDto } from './indication.response-dto'

export class SearchIndicationResponseDto extends PaginatedResponse(
  IndicationResponseDto,
) {}
