import { PaginatedResponse } from '@diut/nest-core'
import { SampleTypeResponseDto } from './sample-type.response-dto'

export class SearchSampleTypeResponseDto extends PaginatedResponse(
  SampleTypeResponseDto,
) {}
