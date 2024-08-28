import { AuthSubject, TestAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EEntityCannotDelete,
  IAuthContext,
  ITestElementRepository,
  ITestRepository,
  TESTELEMENT_REPO_TOKEN,
  TEST_REPO_TOKEN,
} from 'src/domain'
import { TestAssertExistsUseCase } from './assert-exists'

@Injectable()
export class TestDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(TEST_REPO_TOKEN)
    private readonly testRepository: ITestRepository,
    @Inject(TESTELEMENT_REPO_TOKEN)
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
        `${connectedElementCount} connected TestElement`,
      )
    }

    await this.testRepository.deleteById(input.id)

    return entity
  }
}
