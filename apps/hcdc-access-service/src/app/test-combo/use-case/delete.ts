import { AuthSubject, TestCombo, TestComboAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  ITestComboRepository,
  TESTCOMBO_REPO_TOKEN,
} from 'src/domain'
import { TestComboSearchUseCase } from './search'

@Injectable()
export class TestComboDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(TESTCOMBO_REPO_TOKEN)
    private readonly testComboRepository: ITestComboRepository,
    private readonly testComboSearchUseCase: TestComboSearchUseCase,
  ) {}

  async execute(input: FilterQuery<TestCombo>) {
    const { ability } = this.authContext.getData()
    const { items: testCombos } = await this.testComboSearchUseCase.execute({
      filter: input,
    })

    for (const testCombo of testCombos) {
      assertPermission(
        ability,
        AuthSubject.TestCombo,
        TestComboAction.Delete,
        testCombo,
      )

      await this.testComboRepository.deleteById(testCombo._id)
    }
  }
}
