import { InjectModel } from '@nestjs/mongoose'
import { MongoRepository } from '@diut/nestjs-core'
import { Model } from 'mongoose'

import { ITestElementRepository } from 'src/domain'
import { TestElementSchema } from './schema'

export class TestElementRepository
  extends MongoRepository<TestElementSchema>
  implements ITestElementRepository
{
  constructor(
    @InjectModel(TestElementSchema.name) model: Model<TestElementSchema>,
  ) {
    super(model)
  }
}
