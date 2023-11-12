import { PaginatedResponse } from '@diut/server-core'
import { SampleResponseDto } from './sample.response-dto'

export class SearchSampleResponseDto extends PaginatedResponse(
  SampleResponseDto,
) {}
