import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { MongoRepository } from '@diut/server-core'
import { TestCombo } from './test-combo.schema'

@Injectable()
export class TestComboService extends MongoRepository<TestCombo> {
  constructor(@InjectModel(TestCombo.name) model: Model<TestCombo>) {
    super(model)
  }
}
