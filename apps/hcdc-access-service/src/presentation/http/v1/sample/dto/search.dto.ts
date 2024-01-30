import { SearchRequestDto, PaginatedResponse } from '@diut/nestjs-core'

import { Sample } from 'src/domain'
import { OmittedSampleResponseDto } from './response-dto'

export class SampleSearchRequestDto extends SearchRequestDto<Sample> {}

export class SampleSearchResponseDto extends PaginatedResponse(
  OmittedSampleResponseDto,
) {}
