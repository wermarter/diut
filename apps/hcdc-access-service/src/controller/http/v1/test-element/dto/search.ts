import { SearchRequestDto, PaginatedResponse } from '@diut/nestjs-infra'
import { TestElement } from '@diut/hcdc'

import { TestElementResponseDto } from './response-dto'

export class TestElementSearchRequestDto extends SearchRequestDto<TestElement> {}

export class TestElementSearchResponseDto extends PaginatedResponse(
  TestElementResponseDto,
) {}
