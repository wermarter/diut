import { AuthSubject, TestCategory, TestCategoryAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EEntityCannotDelete,
  IAuthContext,
  ITestCategoryRepository,
  ITestRepository,
  TESTCATEGORY_REPO_TOKEN,
  TEST_REPO_TOKEN,
} from 'src/domain'
import { TestCategorySearchUseCase } from './search'

@Injectable()
export class TestCategoryDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(TESTCATEGORY_REPO_TOKEN)
    private readonly testCategoryRepository: ITestCategoryRepository,
    @Inject(TEST_REPO_TOKEN)
    private readonly testRepository: ITestRepository,
    private readonly testCategorySearchUseCase: TestCategorySearchUseCase,
  ) {}

  async execute(input: FilterQuery<TestCategory>) {
    const { ability } = this.authContext.getData()
    const { items: testCategories } =
      await this.testCategorySearchUseCase.execute({ filter: input })

    for (const testCategory of testCategories) {
      assertPermission(
        ability,
        AuthSubject.TestCategory,
        TestCategoryAction.Delete,
        testCategory,
      )

      const connectedTestCount = await this.testRepository.count({
        testCategoryId: testCategory._id,
      })
      if (connectedTestCount > 0) {
        throw new EEntityCannotDelete(`${connectedTestCount} connected Test`)
      }

      await this.testCategoryRepository.deleteById(testCategory._id)
    }
  }
}
