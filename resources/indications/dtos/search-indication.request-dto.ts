import { SearchRequestDto } from '@diut/nest-core'
import { Indication } from '../indication.schema'

export class SearchIndicationRequestDto extends SearchRequestDto<Indication> {}
