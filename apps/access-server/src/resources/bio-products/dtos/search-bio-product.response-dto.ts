import { PaginatedResponse } from 'src/core'
import { BioProductResponseDto } from './bio-product.response-dto'

export class SearchBioProductResponseDto extends PaginatedResponse(
  BioProductResponseDto
) {}
