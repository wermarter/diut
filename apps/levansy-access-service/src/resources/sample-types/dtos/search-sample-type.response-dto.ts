import { PaginatedResponse } from '@diut/server-core'
import { SampleTypeResponseDto } from './sample-type.response-dto'

export class SearchSampleTypeResponseDto extends PaginatedResponse(
  SampleTypeResponseDto,
) {}
