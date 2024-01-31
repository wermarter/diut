import { SearchRequestDto } from '@diut/nestjs-infra'

import { TestCombo } from 'src/domain'

export class TestComboSearchRequestDto extends SearchRequestDto<TestCombo> {}
