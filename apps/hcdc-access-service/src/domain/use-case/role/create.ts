import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  RoleRepositoryToken,
  IAuthContext,
  IRoleRepository,
} from 'src/domain/interface'
import { Role, RoleAction, EntityData } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { RoleValidateUseCase } from './validate'

@Injectable()
export class RoleCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(RoleRepositoryToken)
    private readonly roleRepository: IRoleRepository,
    private readonly roleValidateUseCase: RoleValidateUseCase,
  ) {}

  async execute(input: EntityData<Role>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Role, RoleAction.Create, input)
    await this.roleValidateUseCase.execute(input)

    const entity = await this.roleRepository.create(input)

    return entity
  }
}
