import { Inject, Injectable } from '@nestjs/common'

import { TestElementAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  TestElementRepositoryToken,
  IAuthContext,
  ITestElementRepository,
} from 'src/domain/interface'
import { TestElementAssertExistsUseCase } from './assert-exists'
import { TestElementValidateUseCase } from './validate'

@Injectable()
export class TestElementUpdateUseCase {
  constructor(
    @Inject(TestElementRepositoryToken)
    private readonly testElementRepository: ITestElementRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly testElementAssertExistsUseCase: TestElementAssertExistsUseCase,
    private readonly testElementValidateUseCase: TestElementValidateUseCase,
  ) {}

  async execute(...input: Parameters<ITestElementRepository['update']>) {
    const entity = await this.testElementAssertExistsUseCase.execute(input[0])
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.TestElement,
      TestElementAction.Update,
      entity,
    )
    await this.testElementValidateUseCase.execute(input[1])

    return this.testElementRepository.update(...input)
  }
}
