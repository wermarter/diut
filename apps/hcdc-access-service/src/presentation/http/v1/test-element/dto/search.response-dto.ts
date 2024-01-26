import { PaginatedResponse } from '@diut/nest-core'

import { TestElementResponseDto } from './response-dto'

export class TestElementSearchResponseDto extends PaginatedResponse(
  TestElementResponseDto,
) {}
