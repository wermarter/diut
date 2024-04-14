import { SearchRequestDto } from '@diut/nestjs-infra'
import { BioProduct } from '@diut/hcdc'

export class BioProductSearchRequestDto extends SearchRequestDto<BioProduct> {}
