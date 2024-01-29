import { PaginatedResponse } from '@diut/nestjs-core'

import { SampleResponseDto } from './response-dto'

export class SampleSearchResponseDto extends PaginatedResponse(
  SampleResponseDto,
) {}
