import { PaginatedResponse } from '@diut/nestjs-core'

import { TestCategoryResponseDto } from './response-dto'

export class TestCategorySearchResponseDto extends PaginatedResponse(
  TestCategoryResponseDto,
) {}
