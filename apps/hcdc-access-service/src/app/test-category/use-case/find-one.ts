import { Inject, Injectable } from '@nestjs/common'
import { TestCategory, TestCategoryAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  TestCategoryRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  ITestCategoryRepository,
  assertPermission,
} from 'src/domain'
import { TestCategoryAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class TestCategoryFindOneUseCase {
  constructor(
    @Inject(TestCategoryRepositoryToken)
    private readonly testCategoryRepository: ITestCategoryRepository,
    @Inject(AuthContextToken)
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
