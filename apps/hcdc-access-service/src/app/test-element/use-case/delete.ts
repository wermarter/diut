import { AuthSubject, TestElement, TestElementAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  ITestElementRepository,
  TESTELEMENT_REPO_TOKEN,
} from 'src/domain'
import { TestElementSearchUseCase } from './search'

@Injectable()
export class TestElementDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(TESTELEMENT_REPO_TOKEN)
    private readonly testElementRepository: ITestElementRepository,
    private readonly testElementSearchUseCase: TestElementSearchUseCase,
  ) {}

  async execute(input: FilterQuery<TestElement>) {
    const { ability } = this.authContext.getData()
    const { items: testElements } = await this.testElementSearchUseCase.execute(
      { filter: input },
    )

    for (const testElement of testElements) {
      assertPermission(
        ability,
        AuthSubject.TestElement,
        TestElementAction.Delete,
        testElement,
      )

      await this.testElementRepository.deleteById(testElement._id)
    }
  }
}
