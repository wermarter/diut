import { SearchRequestDto, PaginatedResponse } from '@diut/nestjs-infra'
import { SampleType } from '@diut/hcdc'

import { SampleTypeResponseDto } from './response-dto'

export class SampleTypeSearchRequestDto extends SearchRequestDto<SampleType> {}

export class SampleTypeSearchResponseDto extends PaginatedResponse(
  SampleTypeResponseDto,
) {}
