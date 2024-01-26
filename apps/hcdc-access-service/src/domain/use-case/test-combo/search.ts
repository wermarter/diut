import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'

import {
  AuthContextToken,
  TestComboRepositoryToken,
  IAuthContext,
  ITestComboRepository,
  EntitySearchOptions,
} from 'src/domain/interface'
import { TestCombo, TestComboAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { TestComboAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class TestComboSearchUseCase {
  constructor(
    @Inject(TestComboRepositoryToken)
    private readonly testComboRepository: ITestComboRepository,
    @Inject(AuthContextToken)
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
          accessibleBy(ability, TestComboAction.Read).TestCombo,
        ],
      },
    })

    return paginationResult
  }
}
