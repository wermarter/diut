import { PaginatedResponse } from '@diut/nestjs-infra'

import { BioProductResponseDto } from './response-dto'

export class BioProductSearchResponseDto extends PaginatedResponse(
  BioProductResponseDto,
) {}
