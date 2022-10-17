import { SearchRequestDto } from 'src/core/http-server/dtos/search-request'
import { Test } from '../test.schema'

export class SearchTestRequestDto extends SearchRequestDto<Test> {}
