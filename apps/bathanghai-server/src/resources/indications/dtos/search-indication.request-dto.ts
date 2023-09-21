import { SearchRequestDto } from '@diut/server-core'
import { Indication } from '../indication.schema'

export class SearchIndicationRequestDto extends SearchRequestDto<Indication> {}
