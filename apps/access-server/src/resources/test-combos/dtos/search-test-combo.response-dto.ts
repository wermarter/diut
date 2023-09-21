import { PaginatedResponse } from '@diut/server-core'
import { TestComboResponseDto } from './test-combo.response-dto'

export class SearchTestComboResponseDto extends PaginatedResponse(
  TestComboResponseDto,
) {}
