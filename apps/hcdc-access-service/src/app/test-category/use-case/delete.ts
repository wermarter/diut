import { Inject, Injectable } from '@nestjs/common'

import { TestCategoryAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  TestCategoryRepositoryToken,
  IAuthContext,
  ITestCategoryRepository,
  TestRepositoryToken,
  ITestRepository,
} from 'src/domain/interface'
import { TestCategoryAssertExistsUseCase } from './assert-exists'
import { EEntityCannotDelete } from 'src/domain'

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
      throw new EEntityCannotDelete(
        `there are ${connectedTestCount} connected Test`,
      )
    }

    await this.testCategoryRepository.deleteById(input.id)

    return entity
  }
}
