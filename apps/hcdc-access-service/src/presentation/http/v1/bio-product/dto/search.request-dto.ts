import { SearchRequestDto } from '@diut/nestjs-core'

import { BioProduct } from 'src/domain'

export class BioProductSearchRequestDto extends SearchRequestDto<BioProduct> {}
