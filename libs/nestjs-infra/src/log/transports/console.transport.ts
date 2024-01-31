import { utilities } from 'nest-winston'
import * as winston from 'winston'

export function buildConsoleTransport(serviceName: string) {
  return new winston.transports.Console({
    level: 'verbose',
    format: winston.format.combine(
      winston.format.timestamp(),
      utilities.format.nestLike('-', {
        colors: true,
        prettyPrint: true,
      }),
    ),
  })
}
