import { createAbility, PermissionRule, Role } from '@diut/hcdc'
import { Inject } from '@nestjs/common'

import {
  AuthContextData,
  AuthPayload,
  IUserRepository,
  UserRepositoryToken,
  EAuthnPayloadUserNotFound,
  compilePermissionRules,
} from 'src/domain'

export class AuthPopulateContextUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: AuthPayload): Promise<AuthContextData> {
    const user = await this.userRepository.findOne({
      filter: { _id: input.userId },
      populates: [
        { path: 'roles', fields: ['permissions'] satisfies (keyof Role)[] },
      ],
    })
    if (!user) {
      throw new EAuthnPayloadUserNotFound()
    }

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

    const ability = createAbility(compiledPermissions)

    return { user, ability }
  }
}
