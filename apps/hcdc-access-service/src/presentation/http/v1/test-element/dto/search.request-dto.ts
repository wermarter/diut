import { SearchRequestDto } from '@diut/nest-core'

import { TestElement } from 'src/domain'

export class TestElementSearchRequestDto extends SearchRequestDto<TestElement> {}
