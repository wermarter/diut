import { PaginatedResponse } from 'src/core'
import { IndicationResponseDto } from './indication.response-dto'

export class SearchIndicationResponseDto extends PaginatedResponse(
  IndicationResponseDto
) {}
