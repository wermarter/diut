import { Inject, Injectable } from '@nestjs/common'
import { TestElementAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  TESTELEMENT_REPO_TOKEN,
  IAuthContext,
  ITestElementRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { TestElementAssertExistsUseCase } from './assert-exists'

@Injectable()
export class TestElementDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(TESTELEMENT_REPO_TOKEN)
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
