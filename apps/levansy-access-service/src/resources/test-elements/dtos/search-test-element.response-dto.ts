import { PaginatedResponse } from '@diut/nest-core'
import { TestElementResponseDto } from './test-element.response-dto'

export class SearchTestElementResponseDto extends PaginatedResponse(
  TestElementResponseDto,
) {}
