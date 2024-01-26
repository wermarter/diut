import { Inject, Injectable } from '@nestjs/common'

import { TestCombo, TestComboAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  TestComboRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  ITestComboRepository,
} from 'src/domain/interface'
import { TestComboAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class TestComboFindOneUseCase {
  constructor(
    @Inject(TestComboRepositoryToken)
    private readonly testComboRepository: ITestComboRepository,
    @Inject(AuthContextToken)
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
