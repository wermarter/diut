import { PaginatedResponse } from 'src/core'
import { TestResponseDto } from './test.response-dto'

export class SearchTestResponseDto extends PaginatedResponse(
  TestResponseDto
) {}
