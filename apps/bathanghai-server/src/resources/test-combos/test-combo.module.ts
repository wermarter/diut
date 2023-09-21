import { Module } from '@nestjs/common'

import { MongoModule } from '@diut/server-core'
import { TestComboController } from './test-combo.controller'
import { TestCombo } from './test-combo.schema'
import { TestComboService } from './test-combo.service'

@Module({
  imports: [MongoModule.forFeature([TestCombo])],
  providers: [TestComboService],
  controllers: [TestComboController],
  exports: [TestComboService],
})
export class TestComboModule {}
