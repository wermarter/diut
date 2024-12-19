import { AuthSubject, EntityData, TestCombo, TestComboAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  ITestComboRepository,
  TESTCOMBO_REPO_TOKEN,
} from 'src/domain'
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
