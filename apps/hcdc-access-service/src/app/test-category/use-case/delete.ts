import { Inject, Injectable } from '@nestjs/common'
import { TestCategoryAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  TestCategoryRepositoryToken,
  IAuthContext,
  ITestCategoryRepository,
  TestRepositoryToken,
  ITestRepository,
  assertPermission,
  EEntityCannotDelete,
} from 'src/domain'
import { TestCategoryAssertExistsUseCase } from './assert-exists'

@Injectable()
export class TestCategoryDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(TestCategoryRepositoryToken)
    private readonly testCategoryRepository: ITestCategoryRepository,
    @Inject(TestRepositoryToken)
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
