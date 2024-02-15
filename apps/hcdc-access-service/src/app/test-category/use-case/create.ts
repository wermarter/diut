import { Inject, Injectable } from '@nestjs/common'
import { TestCategory, TestCategoryAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  TestCategoryRepositoryToken,
  IAuthContext,
  ITestCategoryRepository,
  EntityData,
  assertPermission,
} from 'src/domain'
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
