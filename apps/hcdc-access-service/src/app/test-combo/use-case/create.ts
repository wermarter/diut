import { Inject, Injectable } from '@nestjs/common'
import { TestCombo, TestComboAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  TestComboRepositoryToken,
  IAuthContext,
  ITestComboRepository,
  EntityData,
  assertPermission,
} from 'src/domain'
import { TestComboValidateUseCase } from './validate'

@Injectable()
export class TestComboCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(TestComboRepositoryToken)
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
