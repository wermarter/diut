import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'
import { Test, TestAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  TEST_REPO_TOKEN,
  IAuthContext,
  ITestRepository,
  EntitySearchOptions,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { TestAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class TestSearchUseCase {
  constructor(
    @Inject(TEST_REPO_TOKEN)
    private readonly testRepository: ITestRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly testAuthorizePopulatesUseCase: TestAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntitySearchOptions<Test>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Test, TestAction.Read)
    input.populates = this.testAuthorizePopulatesUseCase.execute(
      input.populates,
    )

    const paginationResult = await this.testRepository.search({
      ...input,
      filter: {
        $and: [
          input.filter ?? {},
          accessibleBy(ability, TestAction.Read).ofType(AuthSubject.Test),
        ],
      },
    })

    return paginationResult
  }
}
