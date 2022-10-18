import { Module } from '@nestjs/common'

import { importCollection } from 'src/clients/mongo'
import { TestComboController } from './test-combo.controller'
import { TestCombo } from './test-combo.schema'
import { TestComboService } from './test-combo.service'

@Module({
  imports: [importCollection(TestCombo)],
  providers: [TestComboService],
  controllers: [TestComboController],
  exports: [TestComboService],
})
export class TestComboModule {}
