import { MongoRepository } from '@diut/nestjs-infra'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { IInstrumentRepository } from 'src/domain'
import { InstrumentSchema } from './schema'

export class InstrumentRepository
  extends MongoRepository<InstrumentSchema>
  implements IInstrumentRepository
{
  constructor(
    @InjectModel(InstrumentSchema.name) model: Model<InstrumentSchema>,
  ) {
    super(model)
  }
}
