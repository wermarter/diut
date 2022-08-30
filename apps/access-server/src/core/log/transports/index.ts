import { ConfigService } from '@nestjs/config'
import { utilities } from 'nest-winston'
import * as winston from 'winston'

import { PROJECT_PREFIX } from '@diut/common'

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

export function buildTransportArray(config: ConfigService) {
  const transports = []
  const isProduction = config.get('env') === 'production'

  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        ignoreNestInit(),
        winston.format.json(),
        utilities.format.nestLike(
          config.get('package.name').replace(PROJECT_PREFIX, ''),
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

  return transports
}
