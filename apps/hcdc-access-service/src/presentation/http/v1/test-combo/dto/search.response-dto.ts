import { PaginatedResponse } from '@diut/nestjs-infra'

import { TestComboResponseDto } from './response-dto'

export class TestComboSearchResponseDto extends PaginatedResponse(
  TestComboResponseDto,
) {}
