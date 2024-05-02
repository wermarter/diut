import { Inject, Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'

import {
  AuthPayloadInternal,
  IUserRepository,
  UserRepositoryToken,
  EAuthnLoginInvalidPassword,
  EAuthnLoginInvalidUsername,
} from 'src/domain'
import { AuthPopulateContextUseCase } from './populate-context'
import { AuthSetContextCacheUseCase } from './set-context-cache'

@Injectable()
export class AuthLoginUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    private readonly authPopulateContextUseCase: AuthPopulateContextUseCase,
    private readonly authSetContextCacheUseCase: AuthSetContextCacheUseCase,
  ) {}

  async execute(input: { username: string; password: string }) {
    const _user = await this.userRepository.findOne({
      filter: { username: input.username },
      populates: [{ path: 'branches' }],
    })
    if (!_user) {
      throw new EAuthnLoginInvalidUsername()
    }

    const isCorrect = await argon2.verify(_user.passwordHash, input.password)
    if (!isCorrect) {
      throw new EAuthnLoginInvalidPassword()
    }

    const authPayload: AuthPayloadInternal = {
      userId: _user._id,
    }
    const { user, compiledPermissions } =
      await this.authPopulateContextUseCase.execute(authPayload)
    await this.authSetContextCacheUseCase.execute({ user, compiledPermissions })
    user.branches = _user.branches

    return { user, compiledPermissions }
  }
}
