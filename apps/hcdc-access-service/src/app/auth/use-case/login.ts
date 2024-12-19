import { Inject, Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import {
  AUTH_CACHE_SERVICE_TOKEN,
  AuthPayloadInternal,
  EAuthnLoginInvalidPassword,
  EAuthnLoginInvalidUsername,
  IAuthCacheService,
  IUserRepository,
  USER_REPO_TOKEN,
} from 'src/domain'
import { AuthPopulateContextUseCase } from './populate-context'

@Injectable()
export class AuthLoginUseCase {
  constructor(
    @Inject(USER_REPO_TOKEN)
    private readonly userRepository: IUserRepository,
    private readonly authPopulateContextUseCase: AuthPopulateContextUseCase,
    @Inject(AUTH_CACHE_SERVICE_TOKEN)
    private readonly cacheService: IAuthCacheService,
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
    await this.cacheService.setAuthContextInfo({
      user,
      permissions: compiledPermissions,
    })
    user.branches = _user.branches

    return { user, compiledPermissions }
  }
}
