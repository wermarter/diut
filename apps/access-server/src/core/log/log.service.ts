import { Options } from 'pino-http'
import { ConfigService } from '@nestjs/config'
import { NodeEnv, PROJECT_PREFIX } from '@diut/common'

import { LogConfig } from './log.config'
import { validateConfig } from 'src/core/config/validate-config'

export function buildPinoHttpOptions(configService: ConfigService): Options {
  const logConfig = validateConfig(LogConfig)(configService.get('log'))
  const isProduction = configService.get('env') === NodeEnv.Production
  const packageConfig = configService.get('package')

  const devConfig: Options = !isProduction
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            crlf: true,
            ignore: 'version,context,req,pid,hostname',
            messageFormat: '[{context}] {msg}',
            translateTime: 'SYS:HH:MM:ss',
          },
        },
      }
    : {}

  return {
    level: logConfig.level,
    name: configService.get('package').name.replace(PROJECT_PREFIX, ''),
    base: { version: packageConfig.version },
    autoLogging: false,
    ...devConfig,
  }
}
