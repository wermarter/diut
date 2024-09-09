import { DynamicModule, Inject } from '@nestjs/common'

import {
  ASYNC_OPTIONS_TYPE,
  CONNECTION_ID_TOKEN,
  ConfigurableModuleClass,
  getServiceToken,
} from './module-builder'
import { AmqpService } from './service'

export class AmqpModule extends ConfigurableModuleClass {
  static registerAsync(
    options: typeof ASYNC_OPTIONS_TYPE & { connectionId?: string },
  ): DynamicModule {
    const factoryModule = super.registerAsync(options)
    const injectionToken = getServiceToken(options.connectionId)

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
          useClass: AmqpService,
        },
      ],
      exports: [injectionToken],
    }
  }
}

export const InjectAmqpService = (connectionId?: string) =>
  Inject(getServiceToken(connectionId))
