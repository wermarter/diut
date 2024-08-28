import { TestCategory } from '@diut/hcdc'
import { PaginatedResponse, SearchRequestDto } from '@diut/nestjs-infra'

import { TestCategoryResponseDto } from './response-dto'

export class TestCategorySearchRequestDto extends SearchRequestDto<TestCategory> {}

export class TestCategorySearchResponseDto extends PaginatedResponse(
  TestCategoryResponseDto,
) {}
