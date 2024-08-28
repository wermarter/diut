import {
  AuthSubject,
  BranchAction,
  EntityData,
  RoleAction,
  User,
} from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import { BranchAssertExistsUseCase } from 'src/app/branch/use-case/assert-exists'
import { RoleAssertExistsUseCase } from 'src/app/role/use-case/assert-exists'
import { AUTH_CONTEXT_TOKEN, IAuthContext } from 'src/domain'

@Injectable()
export class UserValidateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
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
        assertPermission(ability, AuthSubject.Branch, BranchAction.Read, branch)
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
