import { Inject, Injectable } from '@nestjs/common'

import { Role, RoleAction, assertPermission } from 'src/domain/entity'
import {
  AuthContextToken,
  RoleRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  IRoleRepository,
} from 'src/domain/interface'

@Injectable()
export class RoleFindOneUseCase {
  constructor(
    @Inject(RoleRepositoryToken)
    private readonly roleRepository: IRoleRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
  ) {}

  async execute(input: EntityFindOneOptions<Role>) {
    const { ability } = this.authContext.getData()

    const entity = await this.roleRepository.findOne(input)

    if (entity != null) {
      // TODO: check this in assert exists
      assertPermission(ability, 'Role', RoleAction.Read, entity)
    }

    return entity
  }
}
