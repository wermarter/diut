import { Inject, Injectable } from '@nestjs/common'
import { TestCategoryAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  TESTCATEGORY_REPO_TOKEN,
  IAuthContext,
  ITestCategoryRepository,
  assertPermission,
} from 'src/domain'
import { TestCategoryAssertExistsUseCase } from './assert-exists'
import { TestCategoryValidateUseCase } from './validate'

@Injectable()
export class TestCategoryUpdateUseCase {
  constructor(
    @Inject(TESTCATEGORY_REPO_TOKEN)
    private readonly testCategoryRepository: ITestCategoryRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly testCategoryAssertExistsUseCase: TestCategoryAssertExistsUseCase,
    private readonly testCategoryValidateUseCase: TestCategoryValidateUseCase,
  ) {}

  async execute(...input: Parameters<ITestCategoryRepository['update']>) {
    const entity = await this.testCategoryAssertExistsUseCase.execute(input[0])
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.TestCategory,
      TestCategoryAction.Update,
      entity,
    )
    await this.testCategoryValidateUseCase.execute(input[1])

    return this.testCategoryRepository.update(...input)
  }
}
