import { Inject, Injectable } from '@nestjs/common'

import { Role, RoleAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import {
  AuthContextToken,
  RoleRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  IRoleRepository,
} from 'src/domain/interface'
import { RoleAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class RoleFindOneUseCase {
  constructor(
    @Inject(RoleRepositoryToken)
    private readonly roleRepository: IRoleRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly roleAuthorizePopulatesUseCase: RoleAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntityFindOneOptions<Role>) {
    input.populates = this.roleAuthorizePopulatesUseCase.execute(
      input.populates,
    )
    const entity = await this.roleRepository.findOne(input)
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Role, RoleAction.Read, entity)

    return entity
  }
}
