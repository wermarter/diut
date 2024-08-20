import { PaginatedResponse } from '@diut/nestjs-infra'

import { SampleTypeResponseDto } from './response-dto'

export class SampleTypeSearchResponseDto extends PaginatedResponse(
  SampleTypeResponseDto,
) {}
