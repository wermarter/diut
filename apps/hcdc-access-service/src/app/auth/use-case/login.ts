import { Inject, Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'

import {
  AuthPayload,
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
    private readonly jwtService: JwtService,
    private readonly authPopulateContextUseCase: AuthPopulateContextUseCase,
    private readonly authSetContextCacheUseCase: AuthSetContextCacheUseCase,
  ) {}

  async execute(input: { username: string; password: string }) {
    const _user = await this.userRepository.findOne({
      filter: { username: input.username },
    })
    if (!_user) {
      throw new EAuthnLoginInvalidUsername()
    }

    const isCorrect = await argon2.verify(_user.passwordHash, input.password)
    if (!isCorrect) {
      throw new EAuthnLoginInvalidPassword()
    }

    const authPayload: AuthPayload = {
      userId: _user._id,
    }
    const accessToken = await this.jwtService.signAsync(authPayload)

    const { user, compiledPermissions } =
      await this.authPopulateContextUseCase.execute(authPayload)
    await this.authSetContextCacheUseCase.execute({ user, compiledPermissions })

    return { user, accessToken, compiledPermissions }
  }
}
