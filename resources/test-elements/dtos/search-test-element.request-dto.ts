import { SearchRequestDto } from '@diut/nestjs-infra'
import { TestElement } from '../test-element.schema'

export class SearchTestElementRequestDto extends SearchRequestDto<TestElement> {}
