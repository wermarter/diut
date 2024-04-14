import { Inject, Injectable } from '@nestjs/common'
import { Instrument, BranchAction, AuthSubject, TestAction } from '@diut/hcdc'

import {
  AuthContextToken,
  IAuthContext,
  assertPermission,
  EntityData,
} from 'src/domain'
import { BranchAssertExistsUseCase } from '../../branch/use-case/assert-exists'
import { TestAssertExistsUseCase } from 'src/app/test'

@Injectable()
export class InstrumentValidateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
    private readonly testAssertExistsUseCase: TestAssertExistsUseCase,
  ) {}

  async execute(input: Partial<EntityData<Instrument>>) {
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
