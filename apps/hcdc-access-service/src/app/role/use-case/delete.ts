import { Inject, Injectable } from '@nestjs/common'
import { AuthSubject, RoleAction } from '@diut/hcdc'

import {
  AuthContextToken,
  RoleRepositoryToken,
  IAuthContext,
  IRoleRepository,
  assertPermission,
  UserRepositoryToken,
  IUserRepository,
  EEntityCannotDelete,
} from 'src/domain'
import { RoleAssertExistsUseCase } from './assert-exists'

@Injectable()
export class RoleDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(RoleRepositoryToken)
    private readonly roleRepository: IRoleRepository,
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    private readonly roleAssertExistsUseCase: RoleAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.roleAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Role, RoleAction.Delete, entity)

    const connectedUserCount = await this.userRepository.count({
      roleIds: { $elemMatch: { $eq: input.id } },
    })
    if (connectedUserCount > 0) {
      throw new EEntityCannotDelete(`${connectedUserCount} connected User`)
    }

    await this.roleRepository.deleteById(input.id)

    return entity
  }
}
