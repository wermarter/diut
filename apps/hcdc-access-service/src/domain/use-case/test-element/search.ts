import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'

import {
  AuthContextToken,
  TestElementRepositoryToken,
  IAuthContext,
  ITestElementRepository,
  EntitySearchOptions,
} from 'src/domain/interface'
import { TestElement, TestElementAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { TestElementAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class TestElementSearchUseCase {
  constructor(
    @Inject(TestElementRepositoryToken)
    private readonly testElementRepository: ITestElementRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly testElementAuthorizePopulatesUseCase: TestElementAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntitySearchOptions<TestElement>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.TestElement, TestElementAction.Read)
    input.populates = this.testElementAuthorizePopulatesUseCase.execute(
      input.populates,
    )

    const paginationResult = await this.testElementRepository.search({
      ...input,
      filter: {
        $and: [
          input.filter ?? {},
          accessibleBy(ability, TestElementAction.Read).TestElement,
        ],
      },
    })

    return paginationResult
  }
}
