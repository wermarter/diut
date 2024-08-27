import { Inject, Injectable } from '@nestjs/common'
import { TestCombo, TestComboAction, AuthSubject, EntityData } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  TESTCOMBO_REPO_TOKEN,
  IAuthContext,
  ITestComboRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { TestComboValidateUseCase } from './validate'

@Injectable()
export class TestComboCreateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(TESTCOMBO_REPO_TOKEN)
    private readonly testComboRepository: ITestComboRepository,
    private readonly testComboValidateUseCase: TestComboValidateUseCase,
  ) {}

  async execute(input: EntityData<TestCombo>) {
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.TestCombo,
      TestComboAction.Create,
      input,
    )
    await this.testComboValidateUseCase.execute(input)

    const entity = await this.testComboRepository.create(input)

    return entity
  }
}
