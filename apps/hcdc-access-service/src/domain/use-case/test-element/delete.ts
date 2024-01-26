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

@Injectable()
export class TestElementDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(TestElementRepositoryToken)
    private readonly testElementRepository: ITestElementRepository,
    private readonly testElementAssertExistsUseCase: TestElementAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.testElementAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.TestElement,
      TestElementAction.Delete,
      entity,
    )

    await this.testElementRepository.deleteById(input.id)

    return entity
  }
}
