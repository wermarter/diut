import {
  AuthSubject,
  BranchAction,
  EntityData,
  TestAction,
  TestElement,
} from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import { BranchAssertExistsUseCase } from 'src/app/branch/use-case/assert-exists'
import { TestAssertExistsUseCase } from 'src/app/test/use-case/assert-exists'
import { AUTH_CONTEXT_TOKEN, IAuthContext } from 'src/domain'

@Injectable()
export class TestElementValidateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
    private readonly testAssertExistsUseCase: TestAssertExistsUseCase,
  ) {}

  async execute(input: Partial<EntityData<TestElement>>) {
    const { ability } = this.authContext.getData()
    const { branchId, testId } = input

    if (testId !== undefined) {
      const test = await this.testAssertExistsUseCase.execute({
        _id: testId,
      })
      assertPermission(ability, AuthSubject.Test, TestAction.Read, test)
    }

    if (branchId !== undefined) {
      const branch = await this.branchAssertExistsUseCase.execute({
        _id: branchId,
      })
      assertPermission(ability, AuthSubject.Branch, BranchAction.Read, branch)
    }
  }
}
