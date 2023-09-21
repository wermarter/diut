import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { MongoRepository } from '@diut/server-core'
import { Test } from './test.schema'

@Injectable()
export class TestService extends MongoRepository<Test> {
  constructor(@InjectModel(Test.name) model: Model<Test>) {
    super(model)
  }
}
