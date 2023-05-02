import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'

import { loadConfig } from './load-config'

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      cache: true,
      load: [loadConfig],
    }),
  ],
})
export class ConfigModule {}
