import { Inject, Injectable } from '@nestjs/common'
import { TestElement, TestElementAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  TESTELEMENT_REPO_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  ITestElementRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { TestElementAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class TestElementFindOneUseCase {
  constructor(
    @Inject(TESTELEMENT_REPO_TOKEN)
    private readonly testElementRepository: ITestElementRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
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
