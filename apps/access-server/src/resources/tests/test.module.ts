import { Module } from '@nestjs/common'

import { importCollection } from 'src/clients/mongo'
import { TestController } from './test.controller'
import { Test } from './test.schema'
import { TestService } from './test.service'

@Module({
  imports: [importCollection(Test, true)],
  providers: [TestService],
  controllers: [TestController],
  exports: [TestService],
})
export class TestModule {}
