import { PaginatedResponse } from '@diut/nestjs-infra'
import { SampleResponseDto } from './sample.response-dto'

export class SearchSampleResponseDto extends PaginatedResponse(
  SampleResponseDto,
) {}
