import { AuthSubject, RoleAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  IRoleRepository,
  ROLE_REPO_TOKEN,
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
