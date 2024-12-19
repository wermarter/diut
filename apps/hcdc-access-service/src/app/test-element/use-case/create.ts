import {
  AuthSubject,
  EntityData,
  TestElement,
  TestElementAction,
} from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  ITestElementRepository,
  TESTELEMENT_REPO_TOKEN,
} from 'src/domain'
import { TestElementValidateUseCase } from './validate'

@Injectable()
export class TestElementCreateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(TESTELEMENT_REPO_TOKEN)
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
