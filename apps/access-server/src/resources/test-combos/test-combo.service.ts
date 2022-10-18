import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseMongoService } from 'src/clients/mongo'
import { TestCombo } from './test-combo.schema'

@Injectable()
export class TestComboService extends BaseMongoService<TestCombo> {
  constructor(@InjectModel(TestCombo.name) model: Model<TestCombo>) {
    super(model, new Logger(TestComboService.name))
  }
}
