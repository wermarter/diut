import { Inject, Injectable } from '@nestjs/common'
import { TestAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  TestRepositoryToken,
  IAuthContext,
  ITestRepository,
  TestElementRepositoryToken,
  ITestElementRepository,
  assertPermission,
  EEntityCannotDelete,
} from 'src/domain'
import { TestAssertExistsUseCase } from './assert-exists'

@Injectable()
export class TestDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(TestRepositoryToken)
    private readonly testRepository: ITestRepository,
    @Inject(TestElementRepositoryToken)
    private readonly testElementRepository: ITestElementRepository,
    private readonly testAssertExistsUseCase: TestAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.testAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Test, TestAction.Delete, entity)

    const connectedElementCount = await this.testElementRepository.count({
      testId: input.id,
    })
    if (connectedElementCount > 0) {
      throw new EEntityCannotDelete(
        `there are ${connectedElementCount} connected TestElement`,
      )
    }

    await this.testRepository.deleteById(input.id)

    return entity
  }
}
