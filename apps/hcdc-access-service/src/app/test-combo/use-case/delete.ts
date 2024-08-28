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

@Injectable()
export class TestComboDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(TESTCOMBO_REPO_TOKEN)
    private readonly testComboRepository: ITestComboRepository,
    private readonly testComboAssertExistsUseCase: TestComboAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.testComboAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.TestCombo,
      TestComboAction.Delete,
      entity,
    )

    await this.testComboRepository.deleteById(input.id)

    return entity
  }
}
