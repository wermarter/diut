import { Inject, Injectable } from '@nestjs/common'
import { TestElement, TestElementAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  TestElementRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  ITestElementRepository,
  assertPermission,
} from 'src/domain'
import { TestElementAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class TestElementFindOneUseCase {
  constructor(
    @Inject(TestElementRepositoryToken)
    private readonly testElementRepository: ITestElementRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly testElementAuthorizePopulatesUseCase: TestElementAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntityFindOneOptions<TestElement>) {
    input.populates = this.testElementAuthorizePopulatesUseCase.execute(
      input.populates,
    )
    const entity = await this.testElementRepository.findOne(input)
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.TestElement,
      TestElementAction.Read,
      entity,
    )

    return entity
  }
}
