import { accessibleBy } from '@casl/mongoose'
import { AuthSubject, TestElement, TestElementAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EntitySearchOptions,
  IAuthContext,
  ITestElementRepository,
  TESTELEMENT_REPO_TOKEN,
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
