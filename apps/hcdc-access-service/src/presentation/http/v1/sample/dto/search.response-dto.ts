import { PaginatedResponse } from '@diut/nest-core'

import { SampleResponseDto } from './response-dto'

export class SampleSearchResponseDto extends PaginatedResponse(
  SampleResponseDto,
) {}
