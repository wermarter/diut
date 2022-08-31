import { Module, RequestMethod } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'

import { buildPinoHttpOptions } from './log.service'

@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          pinoHttp: buildPinoHttpOptions(configService),
        }
      },
    }),
  ],
})
export class LogModule {}
