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

@Injectable()
export class TestComboDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(TestComboRepositoryToken)
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
