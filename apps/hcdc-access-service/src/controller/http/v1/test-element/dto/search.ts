import { TestElement } from '@diut/hcdc'
import { PaginatedResponse, SearchRequestDto } from '@diut/nestjs-infra'

import { TestElementResponseDto } from './response-dto'

export class TestElementSearchRequestDto extends SearchRequestDto<TestElement> {}

export class TestElementSearchResponseDto extends PaginatedResponse(
  TestElementResponseDto,
) {}
