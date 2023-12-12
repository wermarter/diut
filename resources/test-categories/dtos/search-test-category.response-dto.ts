import { PaginatedResponse } from '@diut/nest-core'
import { TestCategoryResponseDto } from './test-category.response-dto'

export class SearchTestCategoryResponseDto extends PaginatedResponse(
  TestCategoryResponseDto,
) {}
