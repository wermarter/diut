import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'
import { TestElement, TestElementAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  TESTELEMENT_REPO_TOKEN,
  IAuthContext,
  ITestElementRepository,
  EntitySearchOptions,
  assertPermission,
} from 'src/domain'
import { TestElementAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class TestElementSearchUseCase {
  constructor(
    @Inject(TESTELEMENT_REPO_TOKEN)
    private readonly testElementRepository: ITestElementRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly testElementAuthorizePopulatesUseCase: TestElementAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntitySearchOptions<TestElement>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.TestElement, TestElementAction.Read)
    input.populates = this.testElementAuthorizePopulatesUseCase.execute(
      input.populates,
    )

    const paginationResult = await this.testElementRepository.search({
      ...input,
      filter: {
        $and: [
          input.filter ?? {},
          accessibleBy(ability, TestElementAction.Read).ofType(
            AuthSubject.TestElement,
          ),
        ],
      },
    })

    return paginationResult
  }
}
