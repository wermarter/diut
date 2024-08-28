import { AuthSubject, RoleAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EEntityCannotDelete,
  IAuthContext,
  IRoleRepository,
  IUserRepository,
  ROLE_REPO_TOKEN,
  USER_REPO_TOKEN,
} from 'src/domain'
import { RoleAssertExistsUseCase } from './assert-exists'

@Injectable()
export class RoleDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(ROLE_REPO_TOKEN)
    private readonly roleRepository: IRoleRepository,
    @Inject(USER_REPO_TOKEN)
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
