import { Inject, Injectable } from '@nestjs/common'
import {
  AuthSubject,
  TestCombo,
  BranchAction,
  TestAction,
  EntityData,
} from '@diut/hcdc'

import { AUTH_CONTEXT_TOKEN, IAuthContext } from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { BranchAssertExistsUseCase } from 'src/app/branch/use-case/assert-exists'
import { TestAssertExistsUseCase } from 'src/app/test/use-case/assert-exists'

@Injectable()
export class TestComboValidateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
    private readonly testAssertExistsUseCase: TestAssertExistsUseCase,
  ) {}

  async execute(input: Partial<EntityData<TestCombo>>) {
    const { ability } = this.authContext.getData()
    const { branchId, testIds } = input

    if (testIds?.length) {
      for (const testId of testIds) {
        const test = await this.testAssertExistsUseCase.execute({
          _id: testId,
        })
        assertPermission(ability, AuthSubject.Test, TestAction.Read, test)
      }
    }

    if (branchId !== undefined) {
      const branch = await this.branchAssertExistsUseCase.execute({
        _id: branchId,
      })
      assertPermission(ability, AuthSubject.Branch, BranchAction.Read, branch)
    }
  }
}
