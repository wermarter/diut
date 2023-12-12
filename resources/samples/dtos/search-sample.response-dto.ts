import { PaginatedResponse } from '@diut/nest-core'
import { SampleResponseDto } from './sample.response-dto'

export class SearchSampleResponseDto extends PaginatedResponse(
  SampleResponseDto,
) {}
