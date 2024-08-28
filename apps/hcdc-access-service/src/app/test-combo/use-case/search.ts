import { accessibleBy } from '@casl/mongoose'
import { AuthSubject, TestCombo, TestComboAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EntitySearchOptions,
  IAuthContext,
  ITestComboRepository,
  TESTCOMBO_REPO_TOKEN,
} from 'src/domain'
import { TestComboAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class TestComboSearchUseCase {
  constructor(
    @Inject(TESTCOMBO_REPO_TOKEN)
    private readonly testComboRepository: ITestComboRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly testComboAuthorizePopulatesUseCase: TestComboAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntitySearchOptions<TestCombo>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.TestCombo, TestComboAction.Read)
    input.populates = this.testComboAuthorizePopulatesUseCase.execute(
      input.populates,
    )

    const paginationResult = await this.testComboRepository.search({
      ...input,
      filter: {
        $and: [
          input.filter ?? {},
          accessibleBy(ability, TestComboAction.Read).ofType(
            AuthSubject.TestCombo,
          ),
        ],
      },
    })

    return paginationResult
  }
}
