import { SearchRequestDto } from '@diut/nestjs-core'
import { Sample } from '../sample.schema'

export class SearchSampleRequestDto extends SearchRequestDto<Sample> {}
