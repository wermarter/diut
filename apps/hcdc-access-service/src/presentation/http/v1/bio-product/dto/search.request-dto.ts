import { SearchRequestDto } from '@diut/nestjs-infra'

import { BioProduct } from 'src/domain'

export class BioProductSearchRequestDto extends SearchRequestDto<BioProduct> {}
