import { SearchRequestDto, PaginatedResponse } from '@diut/nestjs-infra'
import { TestCombo } from '@diut/hcdc'

import { TestComboResponseDto } from './response-dto'

export class TestComboSearchRequestDto extends SearchRequestDto<TestCombo> {}

export class TestComboSearchResponseDto extends PaginatedResponse(
  TestComboResponseDto,
) {}
