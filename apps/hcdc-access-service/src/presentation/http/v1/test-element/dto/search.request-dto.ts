import { SearchRequestDto } from '@diut/nestjs-core'

import { TestElement } from 'src/domain'

export class TestElementSearchRequestDto extends SearchRequestDto<TestElement> {}
