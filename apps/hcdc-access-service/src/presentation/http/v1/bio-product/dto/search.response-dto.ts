import { PaginatedResponse } from '@diut/nest-core'

import { BioProductResponseDto } from './response-dto'

export class BioProductSearchResponseDto extends PaginatedResponse(
  BioProductResponseDto,
) {}
