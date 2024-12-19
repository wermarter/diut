import { AuthSubject, TestElementAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  ITestElementRepository,
  TESTELEMENT_REPO_TOKEN,
} from 'src/domain'
import { TestElementAssertExistsUseCase } from './assert-exists'
import { TestElementValidateUseCase } from './validate'

@Injectable()
export class TestElementUpdateUseCase {
  constructor(
    @Inject(TESTELEMENT_REPO_TOKEN)
    private readonly testElementRepository: ITestElementRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
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
