import { SearchRequestDto, PaginatedResponse } from '@diut/nestjs-infra'
import { Sample } from '@diut/hcdc'

import { OmittedSampleResponseDto } from './response-dto'

export class SampleSearchRequestDto extends SearchRequestDto<Sample> {}

export class SampleSearchResponseDto extends PaginatedResponse(
  OmittedSampleResponseDto,
) {}
