import { SearchRequestDto, PaginatedResponse } from '@diut/nestjs-infra'
import { BioProduct } from '@diut/hcdc'

import { BioProductResponseDto } from './response-dto'

export class BioProductSearchRequestDto extends SearchRequestDto<BioProduct> {}

export class BioProductSearchResponseDto extends PaginatedResponse(
  BioProductResponseDto,
) {}
