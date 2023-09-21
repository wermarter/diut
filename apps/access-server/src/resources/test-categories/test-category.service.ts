import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { MongoRepository } from '@diut/server-core'
import { TestCategory } from './test-category.schema'

@Injectable()
export class TestCategoryService extends MongoRepository<TestCategory> {
  constructor(@InjectModel(TestCategory.name) model: Model<TestCategory>) {
    super(model)
  }
}
