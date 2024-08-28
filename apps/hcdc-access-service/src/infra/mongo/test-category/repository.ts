import { MongoRepository } from '@diut/nestjs-infra'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { ITestCategoryRepository } from 'src/domain'
import { TestCategorySchema } from './schema'

export class TestCategoryRepository
  extends MongoRepository<TestCategorySchema>
  implements ITestCategoryRepository
{
  constructor(
    @InjectModel(TestCategorySchema.name) model: Model<TestCategorySchema>,
  ) {
    super(model)
  }
}
