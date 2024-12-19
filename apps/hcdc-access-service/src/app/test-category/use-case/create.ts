import {
  AuthSubject,
  EntityData,
  TestCategory,
  TestCategoryAction,
} from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  ITestCategoryRepository,
  TESTCATEGORY_REPO_TOKEN,
} from 'src/domain'
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
