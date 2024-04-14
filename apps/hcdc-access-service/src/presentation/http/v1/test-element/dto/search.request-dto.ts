import { SearchRequestDto } from '@diut/nestjs-infra'
import { TestElement } from '@diut/hcdc'

export class TestElementSearchRequestDto extends SearchRequestDto<TestElement> {}
