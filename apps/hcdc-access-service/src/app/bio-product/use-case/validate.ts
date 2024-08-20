import { Inject, Injectable } from '@nestjs/common'
import { BioProduct, BranchAction, AuthSubject, TestAction } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  assertPermission,
  EntityData,
} from 'src/domain'
import { BranchAssertExistsUseCase } from '../../branch/use-case/assert-exists'
import { TestAssertExistsUseCase } from 'src/app/test'

@Injectable()
export class BioProductValidateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
    private readonly testAssertExistsUseCase: TestAssertExistsUseCase,
  ) {}

  async execute(input: Partial<EntityData<BioProduct>>) {
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
