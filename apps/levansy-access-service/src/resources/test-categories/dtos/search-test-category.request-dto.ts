import { SearchRequestDto } from '@diut/nest-core'
import { TestCategory } from '../test-category.schema'

export class SearchTestCategoryRequestDto extends SearchRequestDto<TestCategory> {}
