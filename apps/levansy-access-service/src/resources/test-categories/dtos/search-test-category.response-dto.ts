import { PaginatedResponse } from '@diut/server-core'
import { TestCategoryResponseDto } from './test-category.response-dto'

export class SearchTestCategoryResponseDto extends PaginatedResponse(
  TestCategoryResponseDto,
) {}
