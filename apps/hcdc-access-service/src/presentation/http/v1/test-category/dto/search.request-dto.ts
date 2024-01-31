import { SearchRequestDto } from '@diut/nestjs-infra'

import { TestCategory } from 'src/domain'

export class TestCategorySearchRequestDto extends SearchRequestDto<TestCategory> {}
