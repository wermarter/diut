import { Inject, Injectable } from '@nestjs/common'

import { User, EntityData, RoleAction, BranchAction } from 'src/domain/entity'
import { BranchAssertExistsUseCase } from '../branch/assert-exists'
import { RoleAssertExistsUseCase } from '../role/assert-exists'
import { AuthContextToken, IAuthContext } from 'src/domain/interface'
import { AuthSubject, assertPermission } from 'src/domain/auth'

@Injectable()
export class UserValidateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
    private readonly roleAssertExistsUseCase: RoleAssertExistsUseCase,
  ) {}

  async execute(input: Partial<EntityData<User>>) {
    const { ability } = this.authContext.getData()
    const { branchIds, roleIds, inlinePermissions } = input

    if (inlinePermissions?.length) {
      assertPermission(ability, AuthSubject.Role, RoleAction.AssignUserInline, {
        permissions: inlinePermissions,
      })
    }

    if (branchIds?.length) {
      for (const branchId of branchIds) {
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

    if (roleIds?.length) {
      for (const roleId of roleIds) {
        const role = await this.roleAssertExistsUseCase.execute({ _id: roleId })
        assertPermission(
          ability,
          AuthSubject.Role,
          RoleAction.AssignToUser,
          role,
        )
      }
    }
  }
}
