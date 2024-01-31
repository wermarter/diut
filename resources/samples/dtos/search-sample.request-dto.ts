import { SearchRequestDto } from '@diut/nestjs-infra'
import { Sample } from '../sample.schema'

export class SearchSampleRequestDto extends SearchRequestDto<Sample> {}
