import { DynamicModule, Inject } from '@nestjs/common'

import {
  ASYNC_OPTIONS_TYPE,
  CONNECTION_ID_TOKEN,
  ConfigurableModuleClass,
  getServiceToken,
} from './module-builder'
import { PuppeteerService } from './service'

export const getPuppeteerServiceToken = getServiceToken

export class PuppeteerModule extends ConfigurableModuleClass {
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
          useClass: PuppeteerService,
        },
      ],
      exports: [injectionToken],
    }
  }
}

export const InjectPuppeteerService = (connectionId?: string) =>
  Inject(getServiceToken(connectionId))
