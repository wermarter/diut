import { SearchRequestDto } from 'src/core/http-server/dtos/search-request'
import { TestElement } from '../test-element.schema'

export class SearchTestElementRequestDto extends SearchRequestDto<TestElement> {}
