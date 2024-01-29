import { PaginatedResponse } from '@diut/nestjs-core'

import { BioProductResponseDto } from './response-dto'

export class BioProductSearchResponseDto extends PaginatedResponse(
  BioProductResponseDto,
) {}
