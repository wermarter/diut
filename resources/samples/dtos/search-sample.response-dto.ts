import { PaginatedResponse } from '@diut/nestjs-core'
import { SampleResponseDto } from './sample.response-dto'

export class SearchSampleResponseDto extends PaginatedResponse(
  SampleResponseDto,
) {}
