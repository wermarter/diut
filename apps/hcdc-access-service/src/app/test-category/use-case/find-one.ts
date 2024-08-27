import { Inject, Injectable } from '@nestjs/common'
import { TestCategory, TestCategoryAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  TESTCATEGORY_REPO_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  ITestCategoryRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { TestCategoryAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class TestCategoryFindOneUseCase {
  constructor(
    @Inject(TESTCATEGORY_REPO_TOKEN)
    private readonly testCategoryRepository: ITestCategoryRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly testCategoryAuthorizePopulatesUseCase: TestCategoryAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntityFindOneOptions<TestCategory>) {
    input.populates = this.testCategoryAuthorizePopulatesUseCase.execute(
      input.populates,
    )
    const entity = await this.testCategoryRepository.findOne(input)
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.TestCategory,
      TestCategoryAction.Read,
      entity,
    )

    return entity
  }
}
