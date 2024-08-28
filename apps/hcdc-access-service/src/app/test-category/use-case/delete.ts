import { AuthSubject, TestCategoryAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

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
import { TestCategoryAssertExistsUseCase } from './assert-exists'

@Injectable()
export class TestCategoryDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(TESTCATEGORY_REPO_TOKEN)
    private readonly testCategoryRepository: ITestCategoryRepository,
    @Inject(TEST_REPO_TOKEN)
    private readonly testRepository: ITestRepository,
    private readonly testCategoryAssertExistsUseCase: TestCategoryAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.testCategoryAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.TestCategory,
      TestCategoryAction.Delete,
      entity,
    )

    const connectedTestCount = await this.testRepository.count({
      testCategoryId: input.id,
    })
    if (connectedTestCount > 0) {
      throw new EEntityCannotDelete(`${connectedTestCount} connected Test`)
    }

    await this.testCategoryRepository.deleteById(input.id)

    return entity
  }
}
