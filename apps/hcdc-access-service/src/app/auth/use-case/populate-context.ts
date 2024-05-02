import { PermissionRule, Role } from '@diut/hcdc'
import { Inject } from '@nestjs/common'

import {
  AuthPayloadInternal,
  EEntityNotFound,
  IUserRepository,
  UserRepositoryToken,
  compilePermissionRules,
} from 'src/domain'

export class AuthPopulateContextUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: AuthPayloadInternal) {
    const user = await this.userRepository.findOne({
      filter: { _id: input.userId },
      populates: [
        { path: 'roles', fields: ['permissions'] satisfies (keyof Role)[] },
      ],
    })
    if (!user) {
      throw new EEntityNotFound(`User ${JSON.stringify(input)}`)
    }

    user._id = user._id.toString()
    // @ts-ignore
    delete user.passwordHash

    const rolesPermissions: PermissionRule[] = []
    user.roles?.forEach((role) => {
      if (role !== null) {
        rolesPermissions.push(...role.permissions)
      }
    })

    const compiledPermissions = compilePermissionRules(
      [...rolesPermissions, ...user.inlinePermissions],
      { user },
    )

    return { user, compiledPermissions }
  }
}
