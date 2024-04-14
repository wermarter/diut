import { Inject, Injectable } from '@nestjs/common'
import { TestAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  TestRepositoryToken,
  IAuthContext,
  ITestRepository,
  assertPermission,
} from 'src/domain'
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
    await this.testValidateUseCase.execute({ ...input[1], _id: entity._id })

    return this.testRepository.update(...input)
  }
}
