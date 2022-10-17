import { Module } from '@nestjs/common'

import { importCollection } from 'src/clients/mongo'
import { TestElementController } from './test-element.controller'
import { TestElement } from './test-element.schema'
import { TestElementService } from './test-element.service'

@Module({
  imports: [importCollection(TestElement, true)],
  providers: [TestElementService],
  controllers: [TestElementController],
  exports: [TestElementService],
})
export class TestElementModule {}
