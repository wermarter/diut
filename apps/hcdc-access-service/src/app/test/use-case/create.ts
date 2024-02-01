import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  TestRepositoryToken,
  IAuthContext,
  ITestRepository,
} from 'src/domain/interface'
import { Test, TestAction, EntityData } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { TestValidateUseCase } from './validate'

@Injectable()
export class TestCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(TestRepositoryToken)
    private readonly testRepository: ITestRepository,
    private readonly testValidateUseCase: TestValidateUseCase,
  ) {}

  async execute(input: EntityData<Test>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Test, TestAction.Create, input)
    await this.testValidateUseCase.execute(input)

    const entity = await this.testRepository.create(input)

    return entity
  }
}
