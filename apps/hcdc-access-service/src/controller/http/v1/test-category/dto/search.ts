import { SearchRequestDto, PaginatedResponse } from '@diut/nestjs-infra'
import { TestCategory } from '@diut/hcdc'

import { TestCategoryResponseDto } from './response-dto'

export class TestCategorySearchRequestDto extends SearchRequestDto<TestCategory> {}

export class TestCategorySearchResponseDto extends PaginatedResponse(
  TestCategoryResponseDto,
) {}
