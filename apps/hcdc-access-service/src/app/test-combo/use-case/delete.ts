import { Inject, Injectable } from '@nestjs/common'
import { TestComboAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  TESTCOMBO_REPO_TOKEN,
  IAuthContext,
  ITestComboRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
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
