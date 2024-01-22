import { Inject, Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'

import {
  AuthContextToken,
  UserRepositoryToken,
  IAuthContext,
  IUserRepository,
} from 'src/domain/interface'
import {
  AuthSubject,
  User,
  UserAction,
  EntityData,
  assertPermission,
} from 'src/domain/entity'
import { BranchAssertExistsUseCase } from '../branch/assert-exists'
import { RoleAssertExistsUseCase } from '../role/assert-exists'

@Injectable()
export class UserValidateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
    private readonly roleAssertExistsUseCase: RoleAssertExistsUseCase,
  ) {}

  async execute(
    input: Omit<EntityData<User>, 'passwordHash'> & { password: string },
  ) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.User, UserAction.Create, input)

    for (const branchId of input.branchIds) {
      await this.branchAssertExistsUseCase.execute({ _id: branchId })
    }

    for (const roleId of input.roleIds) {
      await this.roleAssertExistsUseCase.execute({ _id: roleId })
    }

    const passwordHash = await argon2.hash(input.password)

    const entity = await this.userRepository.create({ ...input, passwordHash })

    return entity
  }
}
