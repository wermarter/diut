import { SearchRequestDto } from 'src/core/http-server/dtos/search-request'
import { TestCategory } from '../test-category.schema'

export class SearchTestCategoryRequestDto extends SearchRequestDto<TestCategory> {}
