import { SearchRequestDto } from 'src/core/http-server/dtos/search-request'
import { Sample } from '../sample.schema'

export class SearchSampleRequestDto extends SearchRequestDto<Sample> {}
