import { DynamicModule, Inject } from '@nestjs/common'

import {
  ASYNC_OPTIONS_TYPE,
  CONNECTION_ID_TOKEN,
  ConfigurableModuleClass,
  getClientServiceToken,
} from './module-builder'
import { AmqpClientService } from './service'

export class AmqpClientModule extends ConfigurableModuleClass {
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
          useClass: AmqpClientService,
        },
      ],
      exports: [injectionToken],
    }
  }
}

export const InjectAmqpClientService = (connectionId?: string) =>
  Inject(getClientServiceToken(connectionId))
