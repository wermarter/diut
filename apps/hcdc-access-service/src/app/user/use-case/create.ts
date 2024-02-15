import { Inject, Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import { User, UserAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  UserRepositoryToken,
  IAuthContext,
  IUserRepository,
  assertPermission,
  EntityData,
} from 'src/domain'
import { UserValidateUseCase } from './validate'

@Injectable()
export class UserCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    private readonly userValidateUseCase: UserValidateUseCase,
  ) {}

  async execute(
    input: Omit<EntityData<User>, 'passwordHash'> & { password: string },
  ) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.User, UserAction.Create, input)
    await this.userValidateUseCase.execute(input)

    const passwordHash = await argon2.hash(input.password)
    const entity = await this.userRepository.create({ ...input, passwordHash })

    return entity
  }
}
