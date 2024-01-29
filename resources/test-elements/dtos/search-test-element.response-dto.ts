import { PaginatedResponse } from '@diut/nestjs-core'
import { TestElementResponseDto } from './test-element.response-dto'

export class SearchTestElementResponseDto extends PaginatedResponse(
  TestElementResponseDto,
) {}
