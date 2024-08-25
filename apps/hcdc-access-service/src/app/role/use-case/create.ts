import { Inject, Injectable } from '@nestjs/common'
import { Role, RoleAction, AuthSubject, EntityData } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  ROLE_REPO_TOKEN,
  IAuthContext,
  IRoleRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { RoleValidateUseCase } from './validate'

@Injectable()
export class RoleCreateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(ROLE_REPO_TOKEN)
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
