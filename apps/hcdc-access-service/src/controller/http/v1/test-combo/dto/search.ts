import { TestCombo } from '@diut/hcdc'
import { PaginatedResponse, SearchRequestDto } from '@diut/nestjs-infra'

import { TestComboResponseDto } from './response-dto'

export class TestComboSearchRequestDto extends SearchRequestDto<TestCombo> {}

export class TestComboSearchResponseDto extends PaginatedResponse(
  TestComboResponseDto,
) {}
