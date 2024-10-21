import { DynamicModule } from '@nestjs/common'

import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  DEFAULT_INSTANCE_ID,
  INSTANCE_ID_TOKEN,
} from './module-builder'
import { RedisService } from './service'
import { getRedisServiceToken } from './utils'

export class RedisModule extends ConfigurableModuleClass {
  static registerAsync(
    options: typeof ASYNC_OPTIONS_TYPE & { instanceId?: string },
  ): DynamicModule {
    const factoryModule = super.registerAsync(options)
    const injectionToken = getRedisServiceToken(options.instanceId)

    return {
      ...factoryModule,
      providers: [
        ...(factoryModule.providers ?? []),
        {
          provide: INSTANCE_ID_TOKEN,
          useValue: options.instanceId ?? DEFAULT_INSTANCE_ID,
        },
        {
          provide: injectionToken,
          useClass: RedisService,
        },
      ],
      exports: [injectionToken],
    }
  }
}
