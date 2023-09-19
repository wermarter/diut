import * as winston from 'winston'
import LokiTransport from 'winston-loki'

const lokiFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json({ space: 0 }),
)

export function buildLokiTransport(lokiUrl: string, serviceName: string) {
  return new LokiTransport({
    level: 'debug',
    host: lokiUrl,
    format: lokiFormat,
    replaceTimestamp: false,
    labels: { job: serviceName },
  })
}
