import { Inject, Injectable } from '@nestjs/common'
import { TestComboAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  TestComboRepositoryToken,
  IAuthContext,
  ITestComboRepository,
  assertPermission,
} from 'src/domain'
import { TestComboAssertExistsUseCase } from './assert-exists'
import { TestComboValidateUseCase } from './validate'

@Injectable()
export class TestComboUpdateUseCase {
  constructor(
    @Inject(TestComboRepositoryToken)
    private readonly testComboRepository: ITestComboRepository,
    @Inject(AuthContextToken)
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
