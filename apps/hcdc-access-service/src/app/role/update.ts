import { Inject, Injectable } from '@nestjs/common'

import { AuthSubject, assertPermission } from 'src/domain/auth'
import { RoleAction } from 'src/domain/entity'
import {
  AuthContextToken,
  RoleRepositoryToken,
  IAuthContext,
  IRoleRepository,
} from 'src/domain/interface'
import { RoleAssertExistsUseCase } from './assert-exists'
import { RoleValidateUseCase } from './validate'

@Injectable()
export class RoleUpdateUseCase {
  constructor(
    @Inject(RoleRepositoryToken)
    private readonly roleRepository: IRoleRepository,
    @Inject(AuthContextToken)
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
