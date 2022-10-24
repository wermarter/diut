import { PaginatedResponse } from 'src/core'
import { SampleResponseDto } from './sample.response-dto'

export class SearchSampleResponseDto extends PaginatedResponse(
  SampleResponseDto
) {}
