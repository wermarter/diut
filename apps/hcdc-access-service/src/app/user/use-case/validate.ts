import { Inject, Injectable } from '@nestjs/common'
import { User, AuthSubject, RoleAction, BranchAction } from '@diut/hcdc'

import { BranchAssertExistsUseCase } from '../../branch/use-case/assert-exists'
import { RoleAssertExistsUseCase } from '../../role/use-case/assert-exists'
import {
  EntityData,
  assertPermission,
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
} from 'src/domain'

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
