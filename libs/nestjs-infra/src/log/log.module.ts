import { FactoryProvider, ModuleMetadata } from '@nestjs/common'
import { merge } from 'es-toolkit'
import { WinstonModule, WinstonModuleOptions } from 'nest-winston'

import { buildWinstonDefaultMeta } from './default-meta'
import { buildConsoleTransport } from './transports/console.transport'
import { buildLokiTransport } from './transports/loki.transport'

type LogModuleExtraOptions = {
  // if empty string, app will not send logs to Loki
  lokiUrl?: string
  serviceName: string
}

type LogModuleOptions = Omit<
  WinstonModuleOptions,
  keyof LogModuleExtraOptions
> &
  LogModuleExtraOptions

type LogModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject'> & {
    useFactory: (...args: any[]) => LogModuleOptions | Promise<LogModuleOptions>
  }

export class LogModule {
  static forRootAsync({ imports, inject, useFactory }: LogModuleAsyncOptions) {
    return WinstonModule.forRootAsync({
      imports,
      inject,
      useFactory: async (...args) => {
        const options = await useFactory(...args)
        const transports = Array.isArray(options.transports)
          ? options.transports
          : []

        if (options?.lokiUrl?.length && options.lokiUrl.length > 0) {
          transports.push(
            buildLokiTransport(options.lokiUrl, options.serviceName),
          )
        }

        transports.push(buildConsoleTransport(options.serviceName))

        return {
          ...options,
          defaultMeta: merge(options.defaultMeta, buildWinstonDefaultMeta()),
          transports,
        }
      },
    })
  }
}
