import { SampleType } from '@diut/hcdc'
import { PaginatedResponse, SearchRequestDto } from '@diut/nestjs-infra'
import { SampleTypeResponseDto } from './response-dto'

export class SampleTypeSearchRequestDto extends SearchRequestDto<SampleType> {}

export class SampleTypeSearchResponseDto extends PaginatedResponse(
  SampleTypeResponseDto,
) {}
