import { SearchRequestDto } from '@diut/server-core'
import { Sample } from '../sample.schema'

export class SearchSampleRequestDto extends SearchRequestDto<Sample> {}
