import { DynamicModule, Inject } from '@nestjs/common'

import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  INSTANCE_ID_TOKEN,
  getServiceToken,
} from './module-builder'
import { AwsS3Service } from './service'

export const getAwsS3ServiceToken = getServiceToken

export class AwsS3ClientModule extends ConfigurableModuleClass {
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
          useClass: AwsS3Service,
        },
      ],
      exports: [injectionToken],
    }
  }
}

export const InjectAwsS3Service = (instanceId?: string) =>
  Inject(getServiceToken(instanceId))
