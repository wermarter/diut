import { Inject, Injectable } from '@nestjs/common'

import {
  TestElement,
  BranchAction,
  EntityData,
  TestAction,
} from 'src/domain/entity'
import { BranchAssertExistsUseCase } from '../branch/assert-exists'
import { AuthContextToken, IAuthContext } from 'src/domain/interface'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { TestAssertExistsUseCase } from '../test/assert-exists'

@Injectable()
export class TestElementValidateUseCase {
  constructor(
    @Inject(AuthContextToken)
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