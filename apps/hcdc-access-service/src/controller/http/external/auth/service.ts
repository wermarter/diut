import { Inject, Injectable } from '@nestjs/common'

import {
  AUTH_CACHE_SERVICE_TOKEN,
  AuthContextData,
  AuthType,
  EAuthzContextInvalid,
  IAuthCacheService,
  IAuthService,
} from 'src/domain'

@Injectable()
export class AuthServiceHttpExternal implements IAuthService {
  constructor(
    @Inject(AUTH_CACHE_SERVICE_TOKEN)
    private readonly cacheService: IAuthCacheService,
  ) {}

  async invalidate(context: AuthContextData) {
    if (context.type !== AuthType.External) {
      throw new EAuthzContextInvalid(`type=${context.type}`)
    }

    await this.cacheService.blacklistExternalToken(context.jwt)
  }
}
