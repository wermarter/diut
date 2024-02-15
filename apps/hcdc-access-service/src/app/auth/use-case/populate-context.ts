import { createAbility, PermissionRule, Role } from '@diut/hcdc'
import { Inject } from '@nestjs/common'
const buildJSONTemplate = require('json-templates')

import {
  AuthContextData,
  AuthPayload,
  IUserRepository,
  UserRepositoryToken,
  EAuthnPayloadUserNotFound,
} from 'src/domain'

export class AuthPopulateContextUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: AuthPayload): Promise<AuthContextData> {
    const user = await this.userRepository.findOne({
      filter: { _id: input.userId },
      populates: [{ path: 'roles', fields: ['permissions'] as (keyof Role)[] }],
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
    const permissionTemplate = buildJSONTemplate([
      ...rolesPermissions,
      ...user.inlinePermissions,
    ])
    const permissions = permissionTemplate({ user }) as PermissionRule[]

    // const ability = createAbility(permissions)
    const ability = createAbility([
      {
        subject: 'all',
        action: 'manage',
        // conditions: {
        //   name: { $ne: 'E2' },
        // },
      },
    ])

    return { user, ability }
  }
}
