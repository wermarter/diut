import { InjectModel } from '@nestjs/mongoose'
import { MongoRepository } from '@diut/nestjs-core'
import { Model } from 'mongoose'

import { IRoleRepository } from 'src/domain'
import { RoleSchema } from './schema'

export class RoleRepository
  extends MongoRepository<RoleSchema>
  implements IRoleRepository
{
  constructor(@InjectModel(RoleSchema.name) model: Model<RoleSchema>) {
    super(model)
  }
}
