import { SearchRequestDto } from '@diut/server-core'
import { BioProduct } from '../bio-product.schema'

export class SearchBioProductRequestDto extends SearchRequestDto<BioProduct> {}
