import { PaginatedResponse } from '@diut/nest-core'

import { TestComboResponseDto } from './response-dto'

export class TestComboSearchResponseDto extends PaginatedResponse(
  TestComboResponseDto,
) {}
