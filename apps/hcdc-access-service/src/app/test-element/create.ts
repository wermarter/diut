import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  TestElementRepositoryToken,
  IAuthContext,
  ITestElementRepository,
} from 'src/domain/interface'
import { TestElement, TestElementAction, EntityData } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { TestElementValidateUseCase } from './validate'

@Injectable()
export class TestElementCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(TestElementRepositoryToken)
    private readonly testElementRepository: ITestElementRepository,
    private readonly testElementValidateUseCase: TestElementValidateUseCase,
  ) {}

  async execute(input: EntityData<TestElement>) {
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.TestElement,
      TestElementAction.Create,
      input,
    )
    await this.testElementValidateUseCase.execute(input)

    const entity = await this.testElementRepository.create(input)

    return entity
  }
}
