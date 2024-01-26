import { Inject, Injectable } from '@nestjs/common'

import { TestCategory, BranchAction, EntityData } from 'src/domain/entity'
import { BranchAssertExistsUseCase } from '../branch/assert-exists'
import { AuthContextToken, IAuthContext } from 'src/domain/interface'
import { AuthSubject, assertPermission } from 'src/domain/auth'

@Injectable()
export class TestCategoryValidateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {}

  async execute(input: Partial<EntityData<TestCategory>>) {
    const { ability } = this.authContext.getData()
    const { branchId } = input

    if (branchId !== undefined) {
      const branch = await this.branchAssertExistsUseCase.execute({
        _id: branchId,
      })
      assertPermission(ability, AuthSubject.Branch, BranchAction.Read, branch)
    }
  }
}