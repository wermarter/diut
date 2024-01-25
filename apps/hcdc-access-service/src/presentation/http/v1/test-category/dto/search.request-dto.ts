import { SearchRequestDto } from '@diut/nest-core'

import { TestCategory } from 'src/domain'

export class TestCategorySearchRequestDto extends SearchRequestDto<TestCategory> {}
