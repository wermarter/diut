import { AutoLoggingOptions, Options } from 'pino-http'
import { ConfigService } from '@nestjs/config'
import { NodeEnv, PROJECT_PREFIX } from '@diut/common'
import { Params } from 'nestjs-pino'

import { LogConfig, LOG_CONFIG_NAME } from './log.config'
import { validateConfig } from 'src/core/config/validate-config'

export function buildPinoOptions(configService: ConfigService): Params {
  const logConfig = validateConfig(LogConfig)(
    configService.get(LOG_CONFIG_NAME)
  )
  const isProduction = configService.get('env') === NodeEnv.Production
  const packageConfig = configService.get('package')

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
      }
    : {}

  return {
    pinoHttp: {
      level: logConfig.level,
      name: configService.get('package').name.replace(PROJECT_PREFIX, ''),
      base: { version: packageConfig.version },
      autoLogging: <AutoLoggingOptions>{
        ignore: (req, res) => {
          return res?.statusCode !== 200
        },
      },
      ...devConfig,
    },
  }
}
