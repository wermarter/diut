import { SearchRequestDto } from '@diut/nestjs-infra'

import { TestElement } from 'src/domain'

export class TestElementSearchRequestDto extends SearchRequestDto<TestElement> {}
