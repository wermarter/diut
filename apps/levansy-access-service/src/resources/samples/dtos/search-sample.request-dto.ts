import { SearchRequestDto } from '@diut/nest-core'
import { Sample } from '../sample.schema'

export class SearchSampleRequestDto extends SearchRequestDto<Sample> {}
