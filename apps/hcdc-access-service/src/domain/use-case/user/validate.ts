import { Inject, Injectable } from '@nestjs/common'

import { User, EntityData } from 'src/domain/entity'
import { BranchAssertExistsUseCase } from '../branch/assert-exists'
import { RoleAssertExistsUseCase } from '../role/assert-exists'
import { AuthContextToken, IAuthContext } from 'src/domain/interface'
import { AUTH_ACTION_ALL, AuthSubject, assertPermission } from 'src/domain/auth'

@Injectable()
export class UserValidateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
    private readonly roleAssertExistsUseCase: RoleAssertExistsUseCase,
  ) {}

  async execute(
    input: Partial<
      Pick<EntityData<User>, 'branchIds' | 'roleIds' | 'inlinePermissions'>
    >,
  ) {
    const { ability } = this.authContext.getData()
    const { branchIds, roleIds, inlinePermissions } = input

    if (inlinePermissions !== undefined) {
      assertPermission(ability, AuthSubject.Role, AUTH_ACTION_ALL)
    }

    if (branchIds !== undefined) {
      for (const branchId of branchIds) {
        await this.branchAssertExistsUseCase.execute({ _id: branchId })
      }
    }

    if (roleIds !== undefined) {
      for (const roleId of roleIds) {
        await this.roleAssertExistsUseCase.execute({ _id: roleId })
      }
    }
  }
}
