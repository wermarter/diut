import { PaginatedResponse } from '@diut/server-core'
import { TestElementResponseDto } from './test-element.response-dto'

export class SearchTestElementResponseDto extends PaginatedResponse(
  TestElementResponseDto,
) {}
