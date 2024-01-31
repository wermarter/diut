import { PaginatedResponse } from '@diut/nestjs-infra'

import { TestCategoryResponseDto } from './response-dto'

export class TestCategorySearchResponseDto extends PaginatedResponse(
  TestCategoryResponseDto,
) {}
