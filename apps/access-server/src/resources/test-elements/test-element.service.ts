import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseMongoService } from 'src/clients/mongo'
import { TestElement } from './test-element.schema'

@Injectable()
export class TestElementService extends BaseMongoService<TestElement> {
  constructor(@InjectModel(TestElement.name) model: Model<TestElement>) {
    super(model, new Logger(TestElementService.name))
  }
}
