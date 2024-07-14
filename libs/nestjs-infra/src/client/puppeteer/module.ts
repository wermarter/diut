import { DynamicModule, Inject } from '@nestjs/common'

import {
  ASYNC_OPTIONS_TYPE,
  CONNECTION_ID_TOKEN,
  ConfigurableModuleClass,
  getClientServiceToken,
} from './module-builder'
import { PuppeteerClientService } from './service'

export const getPuppeteerClientServiceToken = getClientServiceToken

export class PuppeteerClientModule extends ConfigurableModuleClass {
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
          useClass: PuppeteerClientService,
        },
      ],
      exports: [injectionToken],
    }
  }
}

export const InjectPuppeteerClientService = (connectionId?: string) =>
  Inject(getClientServiceToken(connectionId))
