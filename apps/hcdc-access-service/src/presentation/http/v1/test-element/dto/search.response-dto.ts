import { PaginatedResponse } from '@diut/nestjs-core'

import { TestElementResponseDto } from './response-dto'

export class TestElementSearchResponseDto extends PaginatedResponse(
  TestElementResponseDto,
) {}
