import { InjectModel } from '@nestjs/mongoose'
import { MongoRepository } from '@diut/nest-core'
import { Model } from 'mongoose'

import { IBioProductRepository } from 'src/domain'
import { BioProductSchema } from './schema'

export class BioProductRepository
  extends MongoRepository<BioProductSchema>
  implements IBioProductRepository
{
  constructor(
    @InjectModel(BioProductSchema.name) model: Model<BioProductSchema>,
  ) {
    super(model)
  }
}
