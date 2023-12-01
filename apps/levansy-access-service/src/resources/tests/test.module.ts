import { Module } from '@nestjs/common'

import { MongoModule } from '@diut/nest-core'
import { TestController } from './test.controller'
import { Test } from './test.schema'
import { TestService } from './test.service'

@Module({
  imports: [MongoModule.forFeature(Test, true)],
  providers: [TestService],
  controllers: [TestController],
  exports: [TestService],
})
export class TestModule {}
