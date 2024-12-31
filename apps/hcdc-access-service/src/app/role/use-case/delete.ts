import { AuthSubject, Role, RoleAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
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
import { RoleSearchUseCase } from './search'

@Injectable()
export class RoleDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(ROLE_REPO_TOKEN)
    private readonly roleRepository: IRoleRepository,
    @Inject(USER_REPO_TOKEN)
    private readonly userRepository: IUserRepository,
    private readonly roleSearchUseCase: RoleSearchUseCase,
  ) {}

  async execute(input: FilterQuery<Role>) {
    const { ability } = this.authContext.getData()
    const { items: roles } = await this.roleSearchUseCase.execute({
      filter: input,
    })

    for (const role of roles) {
      assertPermission(ability, AuthSubject.Role, RoleAction.Delete, role)

      const connectedUserCount = await this.userRepository.count({
        roleIds: { $elemMatch: { $eq: role._id } },
      })
      if (connectedUserCount > 0) {
        throw new EEntityCannotDelete(`${connectedUserCount} connected User`)
      }

      await this.roleRepository.deleteById(role._id)
    }
  }
}
