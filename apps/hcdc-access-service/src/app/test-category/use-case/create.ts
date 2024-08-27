import { Inject, Injectable } from '@nestjs/common'
import {
  TestCategory,
  TestCategoryAction,
  AuthSubject,
  EntityData,
} from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  TESTCATEGORY_REPO_TOKEN,
  IAuthContext,
  ITestCategoryRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { TestCategoryValidateUseCase } from './validate'

@Injectable()
export class TestCategoryCreateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(TESTCATEGORY_REPO_TOKEN)
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
