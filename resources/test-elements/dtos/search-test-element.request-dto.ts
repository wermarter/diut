import { SearchRequestDto } from '@diut/nestjs-core'
import { TestElement } from '../test-element.schema'

export class SearchTestElementRequestDto extends SearchRequestDto<TestElement> {}
