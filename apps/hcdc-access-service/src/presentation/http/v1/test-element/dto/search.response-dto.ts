import { PaginatedResponse } from '@diut/nestjs-infra'

import { TestElementResponseDto } from './response-dto'

export class TestElementSearchResponseDto extends PaginatedResponse(
  TestElementResponseDto,
) {}
