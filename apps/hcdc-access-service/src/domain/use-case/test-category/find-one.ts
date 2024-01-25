import { Inject, Injectable } from '@nestjs/common'

import { TestCategory, TestCategoryAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  TestCategoryRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  ITestCategoryRepository,
} from 'src/domain/interface'
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
