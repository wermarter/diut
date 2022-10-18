import { SearchRequestDto } from 'src/core/http-server/dtos/search-request'
import { TestCombo } from '../test-combo.schema'

export class SearchTestComboRequestDto extends SearchRequestDto<TestCombo> {}
