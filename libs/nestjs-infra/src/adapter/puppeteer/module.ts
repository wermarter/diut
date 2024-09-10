import { DynamicModule, Inject } from '@nestjs/common'

import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  INSTANCE_ID_TOKEN,
  getServiceToken,
} from './module-builder'
import { PuppeteerService } from './service'

export const getPuppeteerServiceToken = getServiceToken

export class PuppeteerModule extends ConfigurableModuleClass {
  static registerAsync(
    options: typeof ASYNC_OPTIONS_TYPE & { instanceId?: string },
  ): DynamicModule {
    const factoryModule = super.registerAsync(options)
    const injectionToken = getServiceToken(options.instanceId)

    return {
      ...factoryModule,
      providers: [
        ...(factoryModule.providers ?? []),
        {
          provide: INSTANCE_ID_TOKEN,
          useValue: options.instanceId,
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

export const InjectPuppeteerService = (instanceId?: string) =>
  Inject(getServiceToken(instanceId))
