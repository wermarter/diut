import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'
import { TestCategory, TestCategoryAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  TestCategoryRepositoryToken,
  IAuthContext,
  ITestCategoryRepository,
  EntitySearchOptions,
  assertPermission,
} from 'src/domain'
import { TestCategoryAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class TestCategorySearchUseCase {
  constructor(
    @Inject(TestCategoryRepositoryToken)
    private readonly testCategoryRepository: ITestCategoryRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly testCategoryAuthorizePopulatesUseCase: TestCategoryAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntitySearchOptions<TestCategory>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.TestCategory, TestCategoryAction.Read)
    input.populates = this.testCategoryAuthorizePopulatesUseCase.execute(
      input.populates,
    )

    const paginationResult = await this.testCategoryRepository.search({
      ...input,
      filter: {
        $and: [
          input.filter ?? {},
          accessibleBy(ability, TestCategoryAction.Read).ofType(
            AuthSubject.TestCategory,
          ),
        ],
      },
    })

    return paginationResult
  }
}
