import { Inject, Injectable } from '@nestjs/common'
import { TestCategory } from '@diut/hcdc'

import {
  TESTCATEGORY_REPO_TOKEN,
  EntityFindOneOptions,
  ITestCategoryRepository,
  EEntityNotFound,
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
