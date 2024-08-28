import { Inject, Injectable } from '@nestjs/common'

import { AuthConfig, loadAuthConfig } from 'src/config'
import {
  AUTH_CACHE_SERVICE_TOKEN,
  AuthContextData,
  AuthType,
  EAuthzContextInvalid,
  IAuthCacheService,
  IAuthService,
} from 'src/domain'

@Injectable()
export class AuthServiceHttpV1 implements IAuthService {
  constructor(
    @Inject(loadAuthConfig.KEY)
    private readonly authConfig: AuthConfig,
    @Inject(AUTH_CACHE_SERVICE_TOKEN)
    private readonly authCacheService: IAuthCacheService,
  ) {}

  async invalidate(input: AuthContextData) {
    if (input.type !== AuthType.Internal) {
      throw new EAuthzContextInvalid(`type=${input.type}`)
    }

    const tokens = this.authCacheService.iterateActiveRefreshTokens(
      input.user._id,
    )

    for await (const { key, token } of tokens) {
      await this.authCacheService.blacklistRefreshToken(
        token,
        this.authConfig.AUTH_JWT_REFRESH_TOKEN_EXPIRE_SECONDS,
      )
      await this.authCacheService.deleteKey(key)
    }

    await this.authCacheService.deleteAuthContext(input.user._id)
  }
}
