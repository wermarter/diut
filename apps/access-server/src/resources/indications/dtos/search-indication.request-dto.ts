import { SearchRequestDto } from 'src/core/http-server/dtos/search-request'
import { Indication } from '../indication.schema'

export class SearchIndicationRequestDto extends SearchRequestDto<Indication> {}
