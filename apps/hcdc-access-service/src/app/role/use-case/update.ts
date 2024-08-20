import { Inject, Injectable } from '@nestjs/common'
import { AuthSubject, RoleAction } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  ROLE_REPO_TOKEN,
  IAuthContext,
  IRoleRepository,
  assertPermission,
} from 'src/domain'
import { RoleAssertExistsUseCase } from './assert-exists'
import { RoleValidateUseCase } from './validate'

@Injectable()
export class RoleUpdateUseCase {
  constructor(
    @Inject(ROLE_REPO_TOKEN)
    private readonly roleRepository: IRoleRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly roleAssertExistsUseCase: RoleAssertExistsUseCase,
    private readonly roleValidateUseCase: RoleValidateUseCase,
  ) {}

  async execute(...input: Parameters<IRoleRepository['update']>) {
    const entity = await this.roleAssertExistsUseCase.execute(input[0])
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Role, RoleAction.Update, entity)
    await this.roleValidateUseCase.execute(input[1])

    return this.roleRepository.update(...input)
  }
}
