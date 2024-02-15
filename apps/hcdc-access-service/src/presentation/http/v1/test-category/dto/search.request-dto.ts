import { SearchRequestDto } from '@diut/nestjs-infra'
import { TestCategory } from '@diut/hcdc'

export class TestCategorySearchRequestDto extends SearchRequestDto<TestCategory> {}
