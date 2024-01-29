import { PaginatedResponse } from '@diut/nestjs-core'

import { SampleTypeResponseDto } from './response-dto'

export class SampleTypeSearchResponseDto extends PaginatedResponse(
  SampleTypeResponseDto,
) {}
