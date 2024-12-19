import { MongoRepository } from '@diut/nestjs-infra'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ITestComboRepository } from 'src/domain'
import { TestComboSchema } from './schema'

export class TestComboRepository
  extends MongoRepository<TestComboSchema>
  implements ITestComboRepository
{
  constructor(
    @InjectModel(TestComboSchema.name) model: Model<TestComboSchema>,
  ) {
    super(model)
  }
}
