import { Inject, Injectable } from '@nestjs/common'

import { TestCategoryAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  TestCategoryRepositoryToken,
  IAuthContext,
  ITestCategoryRepository,
} from 'src/domain/interface'
import { TestCategoryAssertExistsUseCase } from './assert-exists'

@Injectable()
export class TestCategoryDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(TestCategoryRepositoryToken)
    private readonly testCategoryRepository: ITestCategoryRepository,
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

    await this.testCategoryRepository.deleteById(input.id)

    return entity
  }
}
