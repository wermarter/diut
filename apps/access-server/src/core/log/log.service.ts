import { Injectable, OnApplicationShutdown } from '@nestjs/common'
import {
  WinstonModuleOptions,
  WinstonModuleOptionsFactory,
  utilities,
} from 'nest-winston'
import * as winston from 'winston'
import LokiTransport from 'winston-loki'
import { trace, context } from '@opentelemetry/api'

@Injectable()
export class WinstonConfigService
  implements WinstonModuleOptionsFactory, OnApplicationShutdown
{
  protected readonly winstonFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json({ space: 0 }),
  )

  protected readonly lokiTransport =
    process.env.NEST_LOKI_URL?.length > 0
      ? new LokiTransport({
          level: 'debug',
          host: process.env.NEST_LOKI_URL,
          format: this.winstonFormat,
          replaceTimestamp: false,
          labels: { job: process.env.SERVICE_NAME },
        })
      : undefined

  async onApplicationShutdown() {
    this.lokiTransport?.close()
  }

  async createWinstonModuleOptions(): Promise<WinstonModuleOptions> {
    const serviceName = process.env.SERVICE_NAME

    const consoleTransport = new winston.transports.Console({
      level: 'verbose',
      format: winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike(serviceName, {
          colors: true,
          prettyPrint: true,
        }),
      ),
    })

    const transports: winston.transport[] = [consoleTransport]

    if (this.lokiTransport !== undefined) {
      transports.push(this.lokiTransport)
    }

    return {
      defaultMeta: {
        service: serviceName,
        get spanId() {
          return trace.getSpan(context.active())?.spanContext().spanId
        },
        get traceId() {
          return trace.getSpan(context.active())?.spanContext().traceId
        },
      },
      transports,
    }
  }
}
