import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  RoleRepositoryToken,
  IAuthContext,
  IRoleRepository,
} from 'src/domain/interface'
import {
  AuthSubject,
  Role,
  RoleAction,
  EntityData,
  assertPermission,
} from 'src/domain/entity'
import { BranchAssertExistsUseCase } from '../branch/assert-exists'

@Injectable()
export class RoleCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(RoleRepositoryToken)
    private readonly roleRepository: IRoleRepository,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {}

  async execute(input: EntityData<Role>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Role, RoleAction.Create, input)

    for (const branchId of input.branchIds) {
      await this.branchAssertExistsUseCase.execute({ _id: branchId })
    }

    const entity = await this.roleRepository.create(input)

    return entity
  }
}
