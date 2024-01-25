import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  TestCategoryRepositoryToken,
  IAuthContext,
  ITestCategoryRepository,
} from 'src/domain/interface'
import { TestCategory, TestCategoryAction, EntityData } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { TestCategoryValidateUseCase } from './validate'

@Injectable()
export class TestCategoryCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(TestCategoryRepositoryToken)
    private readonly testCategoryRepository: ITestCategoryRepository,
    private readonly testCategoryValidateUseCase: TestCategoryValidateUseCase,
  ) {}

  async execute(input: EntityData<TestCategory>) {
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.TestCategory,
      TestCategoryAction.Create,
      input,
    )
    await this.testCategoryValidateUseCase.execute(input)

    const entity = await this.testCategoryRepository.create(input)

    return entity
  }
}
