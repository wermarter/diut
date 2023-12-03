import { SearchRequestDto } from '@diut/nest-core'
import { BioProduct } from '../bio-product.schema'

export class SearchBioProductRequestDto extends SearchRequestDto<BioProduct> {}
