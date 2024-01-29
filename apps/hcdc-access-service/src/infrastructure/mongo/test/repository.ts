import { InjectModel } from '@nestjs/mongoose'
import { MongoRepository } from '@diut/nestjs-core'
import { Model } from 'mongoose'

import { ITestRepository } from 'src/domain'
import { TestSchema } from './schema'

export class TestRepository
  extends MongoRepository<TestSchema>
  implements ITestRepository
{
  constructor(@InjectModel(TestSchema.name) model: Model<TestSchema>) {
    super(model)
  }
}
