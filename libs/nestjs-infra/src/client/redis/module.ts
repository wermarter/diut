import { DynamicModule, Inject } from '@nestjs/common'

import {
  ASYNC_OPTIONS_TYPE,
  CONNECTION_ID_TOKEN,
  ConfigurableModuleClass,
  getClientServiceToken,
} from './module-builder'
import { RedisClientService } from './service'

export const getRedisClientServiceToken = getClientServiceToken

export class RedisClientModule extends ConfigurableModuleClass {
  static registerAsync(
    options: typeof ASYNC_OPTIONS_TYPE & { connectionId?: string },
  ): DynamicModule {
    const factoryModule = super.registerAsync(options)
    const injectionToken = getClientServiceToken(options.connectionId)

    return {
      ...factoryModule,
      providers: [
        ...(factoryModule.providers ?? []),
        {
          provide: CONNECTION_ID_TOKEN,
          useValue: options.connectionId,
        },
        {
          provide: injectionToken,
          useClass: RedisClientService,
        },
      ],
      exports: [injectionToken],
    }
  }
}

export const InjectRedisClientService = (connectionId?: string) =>
  Inject(getClientServiceToken(connectionId))
