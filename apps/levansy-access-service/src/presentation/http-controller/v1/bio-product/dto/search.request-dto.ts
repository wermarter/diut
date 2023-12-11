import { SearchRequestDto } from '@diut/nest-core'

import { BioProduct } from 'src/domain'

export class BioProductSearchRequestDto extends SearchRequestDto<BioProduct> {}
