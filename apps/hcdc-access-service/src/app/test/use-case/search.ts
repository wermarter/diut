import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'

import {
  AuthContextToken,
  TestRepositoryToken,
  IAuthContext,
  ITestRepository,
  EntitySearchOptions,
} from 'src/domain/interface'
import { Test, TestAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { TestAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class TestSearchUseCase {
  constructor(
    @Inject(TestRepositoryToken)
    private readonly testRepository: ITestRepository,
    @Inject(AuthContextToken)
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
        $and: [input.filter ?? {}, accessibleBy(ability, TestAction.Read).Test],
      },
    })

    return paginationResult
  }
}
