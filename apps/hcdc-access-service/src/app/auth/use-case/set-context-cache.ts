import { PermissionRule, User } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { AuthConfig, loadAuthConfig } from 'src/config'
import {
  CacheKeyFactory,
  CachePrimaryServiceToken,
  ICachePrimaryService,
} from 'src/domain'

@Injectable()
export class AuthSetContextCacheUseCase {
  constructor(
    @Inject(CachePrimaryServiceToken)
    private readonly cacheService: ICachePrimaryService,
    @Inject(loadAuthConfig.KEY)
    private readonly authConfig: AuthConfig,
  ) {}

  async execute(input: { user: User; compiledPermissions: PermissionRule[] }) {
    const content = JSON.stringify(input)

    await this.cacheService.client.set(
      CacheKeyFactory.authContextInfo(input.user._id),
      content,
      'EX',
      this.authConfig.AUTH_JWT_EXPIRE_SECONDS,
    )

    await this.cacheService.synchronize()
  }
}
