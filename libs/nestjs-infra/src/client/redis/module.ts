import { Module } from '@nestjs/common'

import { ConfigurableModuleClass } from './module-builder'
import { RedisClientService } from './service'

@Module({
  providers: [RedisClientService],
  exports: [RedisClientService],
})
export class RedisClientModule extends ConfigurableModuleClass {}
