import { AuthSubject, EntityData, Role, RoleAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  IRoleRepository,
  ROLE_REPO_TOKEN,
} from 'src/domain'
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
