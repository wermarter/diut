import { PaginatedResponse } from '@diut/nestjs-core'

import { TestComboResponseDto } from './response-dto'

export class TestComboSearchResponseDto extends PaginatedResponse(
  TestComboResponseDto,
) {}
