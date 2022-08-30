import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'

import { ConfigModule, NestConfigModule } from 'src/core/config'
import { buildTransportArray } from './transports'
import { injectStackFormat } from './utils'

@Module({
  imports: [
    WinstonModule.forRootAsync({
      // imports: [NestConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          // format: winston.format.combine(
          //   injectStackFormat(),
          //   winston.format.timestamp()
          // ),
          transports: buildTransportArray(config),
        }
      },
    }),
  ],
})
export class LogModule {}
