import { AuthSubject, TestComboAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  ITestComboRepository,
  TESTCOMBO_REPO_TOKEN,
} from 'src/domain'
import { TestComboSearchUseCase } from './search'
import { TestComboValidateUseCase } from './validate'

@Injectable()
export class TestComboUpdateUseCase {
  constructor(
    @Inject(TESTCOMBO_REPO_TOKEN)
    private readonly testComboRepository: ITestComboRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly testComboSearchUseCase: TestComboSearchUseCase,
    private readonly testComboValidateUseCase: TestComboValidateUseCase,
  ) {}

  async execute(...input: Parameters<ITestComboRepository['update']>) {
    const { ability } = this.authContext.getData()
    const { items: testCombos } = await this.testComboSearchUseCase.execute({
      filter: input[0],
    })
    await this.testComboValidateUseCase.execute(input[1])

    for (const testCombo of testCombos) {
      assertPermission(
        ability,
        AuthSubject.TestCombo,
        TestComboAction.Update,
        testCombo,
      )

      await this.testComboRepository.update(
        { _id: testCombo._id },
        input[1],
        input?.[2],
        input?.[3],
      )
    }
  }
}
