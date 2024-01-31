import { Inject, Injectable } from '@nestjs/common'

import { TestCategory } from 'src/domain/entity'
import { EEntityNotFound } from 'src/domain/exception'
import {
  TestCategoryRepositoryToken,
  EntityFindOneOptions,
  ITestCategoryRepository,
} from 'src/domain/interface'

@Injectable()
export class TestCategoryAssertExistsUseCase {
  constructor(
    @Inject(TestCategoryRepositoryToken)
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
