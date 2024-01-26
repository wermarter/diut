import { SearchRequestDto } from '@diut/nest-core'

import { TestCombo } from 'src/domain'

export class TestComboSearchRequestDto extends SearchRequestDto<TestCombo> {}
