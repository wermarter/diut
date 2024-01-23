import { Inject, Injectable } from '@nestjs/common'

import { AuthSubject, RoleAction, assertPermission } from 'src/domain/entity'
import {
  AuthContextToken,
  RoleRepositoryToken,
  IAuthContext,
  IRoleRepository,
} from 'src/domain/interface'
import { RoleAssertExistsUseCase } from './assert-exists'

@Injectable()
export class RoleDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(RoleRepositoryToken)
    private readonly roleRepository: IRoleRepository,
    private readonly roleAssertExistsUseCase: RoleAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.roleAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Role, RoleAction.Delete, entity)

    await this.roleRepository.deleteById(input.id)

    return entity
  }
}
