import { PaginatedResponse } from '@diut/nest-core'

import { SampleOriginResponseDto } from './sample-origin.response-dto'

export class SearchSampleOriginResponseDto extends PaginatedResponse(
  SampleOriginResponseDto,
) {}
