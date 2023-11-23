import { PaginatedResponse } from '@diut/server-core'

import { SampleOriginResponseDto } from './sample-origin.response-dto'

export class SearchSampleOriginResponseDto extends PaginatedResponse(
  SampleOriginResponseDto,
) {}
