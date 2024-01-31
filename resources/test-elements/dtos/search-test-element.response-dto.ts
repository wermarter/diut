import { PaginatedResponse } from '@diut/nestjs-infra'
import { TestElementResponseDto } from './test-element.response-dto'

export class SearchTestElementResponseDto extends PaginatedResponse(
  TestElementResponseDto,
) {}
