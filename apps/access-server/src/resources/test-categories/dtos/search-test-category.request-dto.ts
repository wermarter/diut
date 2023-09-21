import { SearchRequestDto } from '@diut/server-core'
import { TestCategory } from '../test-category.schema'

export class SearchTestCategoryRequestDto extends SearchRequestDto<TestCategory> {}
