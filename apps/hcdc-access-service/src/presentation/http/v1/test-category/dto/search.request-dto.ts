import { SearchRequestDto } from '@diut/nestjs-core'

import { TestCategory } from 'src/domain'

export class TestCategorySearchRequestDto extends SearchRequestDto<TestCategory> {}
