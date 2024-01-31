import { InjectModel } from '@nestjs/mongoose'
import { MongoRepository } from '@diut/nestjs-infra'
import { Model } from 'mongoose'

import { IBranchRepository } from 'src/domain'
import { BranchSchema } from './schema'

export class BranchRepository
  extends MongoRepository<BranchSchema>
  implements IBranchRepository
{
  constructor(@InjectModel(BranchSchema.name) model: Model<BranchSchema>) {
    super(model)
  }
}
