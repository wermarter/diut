import { PaginatedResponse } from 'src/core'
import { SampleTypeResponseDto } from './sample-type.response-dto'

export class SearchSampleTypeResponseDto extends PaginatedResponse(
  SampleTypeResponseDto
) {}
