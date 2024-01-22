import { Inject, Injectable } from '@nestjs/common'

import {
  AuthSubject,
  User,
  UserAction,
  assertPermission,
} from 'src/domain/entity'
import {
  AuthContextToken,
  UserRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  IUserRepository,
} from 'src/domain/interface'

@Injectable()
export class UserFindOneUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
  ) {}

  async execute(input: EntityFindOneOptions<User>) {
    const { ability } = this.authContext.getData()

    const entity = await this.userRepository.findOne(input)

    assertPermission(ability, AuthSubject.User, UserAction.Read, entity ?? {})

    return entity
  }
}
