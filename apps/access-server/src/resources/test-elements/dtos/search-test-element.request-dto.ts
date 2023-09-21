import { SearchRequestDto } from '@diut/server-core'
import { TestElement } from '../test-element.schema'

export class SearchTestElementRequestDto extends SearchRequestDto<TestElement> {}
