import { SearchRequestDto } from '@diut/nest-core'
import { SampleType } from '../sample-type.schema'

export class SearchSampleTypeRequestDto extends SearchRequestDto<SampleType> {}
