import { AuthSubject, Role, RoleAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  IRoleRepository,
  ROLE_REPO_TOKEN,
} from 'src/domain'
import { RoleAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class RoleFindOneUseCase {
  constructor(
    @Inject(ROLE_REPO_TOKEN)
    private readonly roleRepository: IRoleRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
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
