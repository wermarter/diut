import { PaginatedResponse } from '@diut/nest-core'
import { IndicationResponseDto } from './indication.response-dto'

export class SearchIndicationResponseDto extends PaginatedResponse(
  IndicationResponseDto,
) {}
