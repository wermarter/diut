import { Inject, Injectable } from '@nestjs/common'

import { Role, EntityData, BranchAction } from 'src/domain/entity'
import { BranchAssertExistsUseCase } from '../branch/assert-exists'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { AuthContextToken, IAuthContext } from 'src/domain/interface'

@Injectable()
export class RoleValidateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {}

  async execute(input: Partial<EntityData<Role>>) {
    const { ability } = this.authContext.getData()
    const { branchId } = input

    if (branchId !== undefined) {
      const branch = await this.branchAssertExistsUseCase.execute({
        _id: branchId,
      })
      assertPermission(
        ability,
        AuthSubject.Branch,
        BranchAction.AssignToSubject,
        branch,
      )
    }
  }
}
