import { SearchRequestDto } from '@diut/nest-core'
import { TestCombo } from '../test-combo.schema'

export class SearchTestComboRequestDto extends SearchRequestDto<TestCombo> {}
