import { Module } from '@nestjs/common'
import { WinstonModule } from 'nest-winston'
import { WinstonConfigService } from './log.service'

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
  ],
})
export class LogModule {}
