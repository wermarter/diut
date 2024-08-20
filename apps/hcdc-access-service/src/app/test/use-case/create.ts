import { Inject, Injectable } from '@nestjs/common'
import { Test, TestAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  TEST_REPO_TOKEN,
  IAuthContext,
  ITestRepository,
  EntityData,
  assertPermission,
} from 'src/domain'
import { TestValidateUseCase } from './validate'

@Injectable()
export class TestCreateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(TEST_REPO_TOKEN)
    private readonly testRepository: ITestRepository,
    private readonly testValidateUseCase: TestValidateUseCase,
  ) {}

  async execute(input: EntityData<Test>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Test, TestAction.Create, input)
    await this.testValidateUseCase.execute(input)

    const entity = await this.testRepository.create(input)

    return entity
  }
}
