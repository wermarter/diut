import { SearchRequestDto } from '@diut/nest-core'
import { TestElement } from '../test-element.schema'

export class SearchTestElementRequestDto extends SearchRequestDto<TestElement> {}
