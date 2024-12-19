import { createAbility } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import {
  AUTH_CACHE_SERVICE_TOKEN,
  AuthContextDataInternal,
  AuthContextDataInternalSerialized,
  AuthType,
  IAuthCacheService,
  IMutexService,
  MUTEX_SERVICE_TOKEN,
} from 'src/domain'
import { AuthPopulateContextUseCase } from './populate-context'

const EXECUTION_TIMEOUT_SECONDS = 5

type OmmitedAuthContextDataInternal = Omit<
  AuthContextDataInternal,
  'accessToken' | 'refreshToken'
>

@Injectable()
export class AuthGetContextInternalUseCase {
  constructor(
    @Inject(AUTH_CACHE_SERVICE_TOKEN)
    private readonly cacheService: IAuthCacheService,
    @Inject(MUTEX_SERVICE_TOKEN)
    private readonly mutexService: IMutexService,
    private readonly authPopulateContextUseCase: AuthPopulateContextUseCase,
  ) {}

  private async createContextData(
    payload: AuthContextDataInternalSerialized,
  ): Promise<OmmitedAuthContextDataInternal> {
    const ability = createAbility(payload.permissions)

    return {
      type: AuthType.Internal,
      user: payload.user,
      ability,
      permissions: payload.permissions,
    }
  }

  async execute(input: {
    userId: string
  }): Promise<OmmitedAuthContextDataInternal> {
    let cachedData = await this.cacheService.getAuthContextInfo(input.userId)
    if (cachedData !== null) {
      return this.createContextData(cachedData)
    }

    return this.mutexService.mutex(
      `getAuthContext:userId:${input.userId}`,
      EXECUTION_TIMEOUT_SECONDS,
      async (signal) => {
        cachedData = await this.cacheService.getAuthContextInfo(
          input.userId,
          true,
        )
        if (cachedData !== null) {
          return this.createContextData(cachedData)
        }

        // create new
        const { user, compiledPermissions: permissions } =
          await this.authPopulateContextUseCase.execute({
            userId: input.userId,
          })

        if (signal.aborted === false) {
          await this.cacheService.setAuthContextInfo({
            user,
            permissions,
          })
          const ability = createAbility(permissions)

          return {
            type: AuthType.Internal,
            user,
            ability,
            permissions,
          }
        } else {
          throw new Error('mutex aborted')
        }
      },
    )
  }
}
