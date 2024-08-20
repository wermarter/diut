import { Inject, Injectable } from '@nestjs/common'
import { TestCombo, TestComboAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  TESTCOMBO_REPO_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  ITestComboRepository,
  assertPermission,
} from 'src/domain'
import { TestComboAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class TestComboFindOneUseCase {
  constructor(
    @Inject(TESTCOMBO_REPO_TOKEN)
    private readonly testComboRepository: ITestComboRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly testComboAuthorizePopulatesUseCase: TestComboAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntityFindOneOptions<TestCombo>) {
    input.populates = this.testComboAuthorizePopulatesUseCase.execute(
      input.populates,
    )
    const entity = await this.testComboRepository.findOne(input)
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.TestCombo,
      TestComboAction.Read,
      entity,
    )

    return entity
  }
}
