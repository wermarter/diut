import { Inject, Injectable } from '@nestjs/common'

import { TestAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  TestRepositoryToken,
  IAuthContext,
  ITestRepository,
} from 'src/domain/interface'
import { TestAssertExistsUseCase } from './assert-exists'
import { TestValidateUseCase } from './validate'

@Injectable()
export class TestUpdateUseCase {
  constructor(
    @Inject(TestRepositoryToken)
    private readonly testRepository: ITestRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly testAssertExistsUseCase: TestAssertExistsUseCase,
    private readonly testValidateUseCase: TestValidateUseCase,
  ) {}

  async execute(...input: Parameters<ITestRepository['update']>) {
    const entity = await this.testAssertExistsUseCase.execute(input[0])
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Test, TestAction.Update, entity)
    await this.testValidateUseCase.execute(input[1])

    return this.testRepository.update(...input)
  }
}
