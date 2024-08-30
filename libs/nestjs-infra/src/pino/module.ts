import { DynamicModule, Inject } from '@nestjs/common'

import {
  PINO_DEFAULT_INSTANCE_ID,
  getPinoLoggerToken,
  getPinoNestjsLoggerToken,
} from './common'
import { PinoNestjsLogger } from './logger-service/nestjs'
import { PinoLogger } from './logger-service/pino'
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  INSTANCE_ID_TOKEN,
} from './module-builder'

export class PinoModule extends ConfigurableModuleClass {
  static registerAsync(
    options: typeof ASYNC_OPTIONS_TYPE & { instanceId?: string },
  ): DynamicModule {
    const factoryModule = super.registerAsync(options)
    const pinoLoggerToken = getPinoLoggerToken(options.instanceId)
    const pinoNestjsLoggerToken = getPinoNestjsLoggerToken(options.instanceId)

    return {
      ...factoryModule,
      providers: [
        ...(factoryModule.providers ?? []),
        {
          provide: INSTANCE_ID_TOKEN,
          useValue: options.instanceId ?? PINO_DEFAULT_INSTANCE_ID,
        },
        PinoLogger,
        {
          provide: pinoLoggerToken,
          useClass: PinoLogger,
        },
        {
          provide: pinoNestjsLoggerToken,
          useClass: PinoNestjsLogger,
        },
      ],
      exports: [pinoLoggerToken, pinoNestjsLoggerToken],
    }
  }
}

export const InjectPinoLogger = (instanceId?: string) =>
  Inject(getPinoLoggerToken(instanceId))
