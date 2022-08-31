import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { WinstonModule } from 'nest-winston'

import { buildTransportArray } from './log.transport'

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          transports: buildTransportArray(config),
        }
      },
    }),
  ],
})
export class LogModule {}
