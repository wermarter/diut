import { TestCategory } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import {
  EEntityNotFound,
  EntityFindOneOptions,
  ITestCategoryRepository,
  TESTCATEGORY_REPO_TOKEN,
} from 'src/domain'

@Injectable()
export class TestCategoryAssertExistsUseCase {
  constructor(
    @Inject(TESTCATEGORY_REPO_TOKEN)
    private readonly testCategoryRepository: ITestCategoryRepository,
  ) {}

  async execute(input: EntityFindOneOptions<TestCategory>['filter']) {
    const rv = await this.testCategoryRepository.findOne({ filter: input })

    if (rv === null) {
      throw new EEntityNotFound(`TestCategory ${JSON.stringify(input)}`)
    }

    return rv
  }
}
