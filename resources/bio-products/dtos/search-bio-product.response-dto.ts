import { PaginatedResponse } from '@diut/nest-core'
import { BioProductResponseDto } from './bio-product.response-dto'

export class SearchBioProductResponseDto extends PaginatedResponse(
  BioProductResponseDto,
) {}
