import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseMongoService } from 'src/clients/mongo'
import { Test } from './test.schema'

@Injectable()
export class TestService extends BaseMongoService<Test> {
  constructor(@InjectModel(Test.name) model: Model<Test>) {
    super(model, new Logger(TestService.name))
  }
}
