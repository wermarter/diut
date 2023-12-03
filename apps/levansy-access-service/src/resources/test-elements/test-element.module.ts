import { Module } from '@nestjs/common'

import { MongoModule } from '@diut/nest-core'
import { TestElementController } from './test-element.controller'
import { TestElement } from './test-element.schema'
import { TestElementService } from './test-element.service'

@Module({
  imports: [MongoModule.forFeature(TestElement, true)],
  providers: [TestElementService],
  controllers: [TestElementController],
  exports: [TestElementService],
})
export class TestElementModule {}
