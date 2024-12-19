import { Sample } from '@diut/hcdc'
import { PaginatedResponse, SearchRequestDto } from '@diut/nestjs-infra'
import { OmittedSampleResponseDto } from './response-dto'

export class SampleSearchRequestDto extends SearchRequestDto<Sample> {}

export class SampleSearchResponseDto extends PaginatedResponse(
  OmittedSampleResponseDto,
) {}
