import { createAbility } from '@diut/hcdc'
import { Inject, Injectable, Logger } from '@nestjs/common'

import {
  AuthContextData,
  CacheKeyFactory,
  CachePrimaryServiceToken,
  CacheSecondaryServiceToken,
  ICachePrimaryService,
  ICacheSecondaryService,
} from 'src/domain'
import { AuthSetContextCacheUseCase } from './set-context-cache'
import { AuthPopulateContextUseCase } from './populate-context'

@Injectable()
export class AuthGetContextUseCase {
  private readonly logger = new Logger(AuthGetContextUseCase.name)

  constructor(
    @Inject(CacheSecondaryServiceToken)
    private readonly cacheSecondaryService: ICacheSecondaryService,
    @Inject(CachePrimaryServiceToken)
    private readonly cachePrimaryService: ICachePrimaryService,
    private readonly authPopulateContextUseCase: AuthPopulateContextUseCase,
    private readonly authSetContextCacheUseCase: AuthSetContextCacheUseCase,
  ) {}

  async execute(input: { userId: string }): Promise<AuthContextData> {
    let content = await this.cacheSecondaryService.client.get(
      CacheKeyFactory.authContextInfo(input.userId),
    )

    if (content === null) {
      content = await this.cachePrimaryService.client.get(
        CacheKeyFactory.authContextInfo(input.userId),
      )
    }

    if (content !== null) {
      const payload: Parameters<AuthSetContextCacheUseCase['execute']>[0] =
        JSON.parse(content)
      const ability = createAbility(payload.compiledPermissions)

      return { user: payload.user, ability }
    }

    this.logger.log({ message: 'cache miss', input })

    const { user, compiledPermissions } =
      await this.authPopulateContextUseCase.execute({ userId: input.userId })
    await this.authSetContextCacheUseCase.execute({ user, compiledPermissions })
    const ability = createAbility(compiledPermissions)

    return { user, ability }
  }
}
