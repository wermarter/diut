import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseMongoService } from 'src/clients/mongo'
import { TestCategory } from './test-category.schema'

@Injectable()
export class TestCategoryService extends BaseMongoService<TestCategory> {
  constructor(@InjectModel(TestCategory.name) model: Model<TestCategory>) {
    super(model, new Logger(TestCategoryService.name))
  }
}
