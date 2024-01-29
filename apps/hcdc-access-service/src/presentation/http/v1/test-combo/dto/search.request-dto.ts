import { SearchRequestDto } from '@diut/nestjs-core'

import { TestCombo } from 'src/domain'

export class TestComboSearchRequestDto extends SearchRequestDto<TestCombo> {}
