import { PaginatedResponse } from '@diut/nest-core'

import { SampleTypeResponseDto } from './response-dto'

export class SampleTypeSearchResponseDto extends PaginatedResponse(
  SampleTypeResponseDto,
) {}
