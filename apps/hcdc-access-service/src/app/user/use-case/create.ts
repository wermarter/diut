import { Inject, Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import { User, UserAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  USER_REPO_TOKEN,
  IAuthContext,
  IUserRepository,
  assertPermission,
  EntityData,
} from 'src/domain'
import { UserValidateUseCase } from './validate'

@Injectable()
export class UserCreateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(USER_REPO_TOKEN)
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
