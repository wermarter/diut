import { Injectable } from '@nestjs/common'

import { User, EntityData } from 'src/domain/entity'
import { BranchAssertExistsUseCase } from '../branch/assert-exists'
import { RoleAssertExistsUseCase } from '../role/assert-exists'

@Injectable()
export class UserValidateUseCase {
  constructor(
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
    private readonly roleAssertExistsUseCase: RoleAssertExistsUseCase,
  ) {}

  async execute(
    input: Partial<Pick<EntityData<User>, 'branchIds' | 'roleIds'>>,
  ) {
    const { branchIds, roleIds } = input

    if (branchIds) {
      for (const branchId of branchIds) {
        await this.branchAssertExistsUseCase.execute({ _id: branchId })
      }
    }

    if (roleIds) {
      for (const roleId of roleIds) {
        await this.roleAssertExistsUseCase.execute({ _id: roleId })
      }
    }
  }
}
