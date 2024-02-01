import { Inject, Injectable } from '@nestjs/common'

import { Test, TestAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  TestRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  ITestRepository,
} from 'src/domain/interface'
import { TestAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class TestFindOneUseCase {
  constructor(
    @Inject(TestRepositoryToken)
    private readonly testRepository: ITestRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly testAuthorizePopulatesUseCase: TestAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntityFindOneOptions<Test>) {
    input.populates = this.testAuthorizePopulatesUseCase.execute(
      input.populates,
    )
    const entity = await this.testRepository.findOne(input)
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Test, TestAction.Read, entity)

    return entity
  }
}
