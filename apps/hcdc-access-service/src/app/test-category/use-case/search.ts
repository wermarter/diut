import { accessibleBy } from '@casl/mongoose'
import { AuthSubject, TestCategory, TestCategoryAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EntitySearchOptions,
  IAuthContext,
  ITestCategoryRepository,
  TESTCATEGORY_REPO_TOKEN,
} from 'src/domain'
import { TestCategoryAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class TestCategorySearchUseCase {
  constructor(
    @Inject(TESTCATEGORY_REPO_TOKEN)
    private readonly testCategoryRepository: ITestCategoryRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
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
