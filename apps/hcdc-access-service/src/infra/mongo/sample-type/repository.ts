import { MongoRepository } from '@diut/nestjs-infra'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ISampleTypeRepository } from 'src/domain'
import { SampleTypeSchema } from './schema'

export class SampleTypeRepository
  extends MongoRepository<SampleTypeSchema>
  implements ISampleTypeRepository
{
  constructor(
    @InjectModel(SampleTypeSchema.name) model: Model<SampleTypeSchema>,
  ) {
    super(model)
  }
}
