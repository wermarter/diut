import { Options } from 'pino-http'
import { ConfigService } from '@nestjs/config'
import { NodeEnv } from '@diut/common'
import { Params } from 'nestjs-pino'
import { trace, context } from '@opentelemetry/api'

import { LogConfig, LOG_CONFIG_NAME } from './log.config'
import { validateConfig } from 'src/core/config/validate-config'

export function buildPinoOptions(configService: ConfigService): Params {
  const logConfig = validateConfig(LogConfig)(
    configService.get(LOG_CONFIG_NAME)
  )
  const isProduction = configService.get('env') === NodeEnv.Production

  const devConfig: Options = !isProduction
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            crlf: true,
            ignore:
              'version,pid,hostname,context,req.headers,res.headers,req.remoteAddress,req.remotePort,req.params,req.query',
            messageFormat: '[{context}] {msg}',
            translateTime: 'SYS:HH:MM:ss',
          },
        },
        autoLogging: true,
      }
    : {}

  return {
    pinoHttp: {
      level: logConfig.level,
      // name: 'access-server',
      // base: { version: '1.0.0' },
      // autoLogging: false,
      // ...devConfig,
      formatters: {
        level(label) {
          return { level: label }
        },
        // Workaround for PinoInstrumentation (does not support latest version yet)
        log(object) {
          const span = trace.getSpan(context.active())
          if (!span) return { ...object }
          const { spanId, traceId } = trace
            .getSpan(context.active())
            ?.spanContext()
          return { ...object, spanId, traceId }
        },
      },
    },
    exclude: ['/api/health'],
  }
}
