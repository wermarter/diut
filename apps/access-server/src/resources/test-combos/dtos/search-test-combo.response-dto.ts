import { PaginatedResponse } from 'src/core'
import { TestComboResponseDto } from './test-combo.response-dto'

export class SearchTestComboResponseDto extends PaginatedResponse(
  TestComboResponseDto
) {}
