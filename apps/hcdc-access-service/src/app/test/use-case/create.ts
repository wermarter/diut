import { AuthSubject, EntityData, Test, TestAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  ITestRepository,
  TEST_REPO_TOKEN,
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
