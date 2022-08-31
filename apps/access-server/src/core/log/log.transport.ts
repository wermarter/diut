import { ConfigService } from '@nestjs/config'
import { utilities } from 'nest-winston'
import * as winston from 'winston'

import { PROJECT_PREFIX } from '@diut/common'
import { validateConfig } from 'src/core/config/validate-config'
import { LogConfig } from './log.config'

const IGNORED_CONTEXTS = [
  'InstanceLoader',
  'NestFactory',
  'RoutesResolver',
  'RouterExplorer',
  'NestApplication',
]

const ignoreNestInit = winston.format((info) => {
  if (
    info.context &&
    IGNORED_CONTEXTS.some((context) => context === info.context)
  ) {
    return false
  }

  return info
})

export function buildTransportArray(configService: ConfigService) {
  const transports = []
  const isProduction = configService.get('env') === 'production'
  const config = validateConfig(LogConfig)(configService.get('log'))

  if (config.console) {
    transports.push(
      new winston.transports.Console({
        format: winston.format.combine(
          ignoreNestInit(),
          winston.format.json(),
          utilities.format.nestLike(
            configService.get('package.name').replace(PROJECT_PREFIX, ''),
            isProduction
              ? {
                  colors: false,
                  prettyPrint: true,
                }
              : {
                  colors: true,
                  prettyPrint: true,
                }
          )
        ),
      })
    )
  }

  return transports
}
