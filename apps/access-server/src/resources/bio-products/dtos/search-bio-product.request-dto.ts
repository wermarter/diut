import { SearchRequestDto } from 'src/core/http-server/dtos/search-request'
import { BioProduct } from '../bio-product.schema'

export class SearchBioProductRequestDto extends SearchRequestDto<BioProduct> {}
