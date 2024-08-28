import { AuthSubject, TestComboAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  ITestComboRepository,
  TESTCOMBO_REPO_TOKEN,
} from 'src/domain'
import { TestComboAssertExistsUseCase } from './assert-exists'
import { TestComboValidateUseCase } from './validate'

@Injectable()
export class TestComboUpdateUseCase {
  constructor(
    @Inject(TESTCOMBO_REPO_TOKEN)
    private readonly testComboRepository: ITestComboRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly testComboAssertExistsUseCase: TestComboAssertExistsUseCase,
    private readonly testComboValidateUseCase: TestComboValidateUseCase,
  ) {}

  async execute(...input: Parameters<ITestComboRepository['update']>) {
    const entity = await this.testComboAssertExistsUseCase.execute(input[0])
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.TestCombo,
      TestComboAction.Update,
      entity,
    )
    await this.testComboValidateUseCase.execute(input[1])

    return this.testComboRepository.update(...input)
  }
}
