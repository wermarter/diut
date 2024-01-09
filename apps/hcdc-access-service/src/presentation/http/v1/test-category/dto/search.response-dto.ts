import { PaginatedResponse } from '@diut/nest-core'

import { TestCategoryResponseDto } from './response-dto'

export class TestCategorySearchResponseDto extends PaginatedResponse(
  TestCategoryResponseDto,
) {}
