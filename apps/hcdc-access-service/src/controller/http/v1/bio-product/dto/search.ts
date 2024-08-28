import { BioProduct } from '@diut/hcdc'
import { PaginatedResponse, SearchRequestDto } from '@diut/nestjs-infra'

import { BioProductResponseDto } from './response-dto'

export class BioProductSearchRequestDto extends SearchRequestDto<BioProduct> {}

export class BioProductSearchResponseDto extends PaginatedResponse(
  BioProductResponseDto,
) {}
