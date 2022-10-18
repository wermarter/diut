import { SearchRequestDto } from 'src/core/http-server/dtos/search-request'
import { SampleType } from '../sample-type.schema'

export class SearchSampleTypeRequestDto extends SearchRequestDto<SampleType> {}
