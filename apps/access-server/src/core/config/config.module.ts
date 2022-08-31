import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { loadConfig } from './load-config'

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      cache: true,
      load: [loadConfig],
    }),
  ],
})
export class ConfigModule {}

export { ConfigModule as NestConfigModule } from '@nestjs/config'
