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
  private readonly executionTimeoutSeconds = 5

  constructor(
    @Inject(CacheSecondaryServiceToken)
    private readonly cacheSecondaryService: ICacheSecondaryService,
    @Inject(CachePrimaryServiceToken)
    private readonly cachePrimaryService: ICachePrimaryService,
    private readonly authPopulateContextUseCase: AuthPopulateContextUseCase,
    private readonly authSetContextCacheUseCase: AuthSetContextCacheUseCase,
  ) {}

  private async parseContent(content: string): Promise<AuthContextData> {
    const payload: Parameters<AuthSetContextCacheUseCase['execute']>[0] =
      JSON.parse(content)
    const ability = createAbility(payload.compiledPermissions)

    return { user: payload.user, ability }
  }

  async execute(input: { userId: string }): Promise<AuthContextData> {
    let content = await this.cacheSecondaryService.client.get(
      CacheKeyFactory.authContextInfo(input.userId),
    )

    if (content !== null) {
      return this.parseContent(content)
    }

    return this.cachePrimaryService.mutex(
      `getAuthContext:userId:${input.userId}`,
      this.executionTimeoutSeconds,
      async (signal) => {
        if (content === null) {
          content = await this.cachePrimaryService.client.get(
            CacheKeyFactory.authContextInfo(input.userId),
          )
        }

        if (content !== null) {
          return this.parseContent(content)
        }

        this.logger.log({ message: 'cache miss', input })

        const { user, compiledPermissions } =
          await this.authPopulateContextUseCase.execute({
            userId: input.userId,
          })

        if (signal.aborted === false) {
          await this.authSetContextCacheUseCase.execute({
            user,
            compiledPermissions,
          })
          const ability = createAbility(compiledPermissions)

          return { user, ability }
        } else {
          throw new Error('mutex aborted')
        }
      },
    )
  }
}
