import { InjectModel } from '@nestjs/mongoose'
import { MongoRepository } from '@diut/nestjs-core'
import { Model } from 'mongoose'

import { IUserRepository } from 'src/domain'
import { UserSchema } from './schema'

export class UserRepository
  extends MongoRepository<UserSchema>
  implements IUserRepository
{
  constructor(@InjectModel(UserSchema.name) model: Model<UserSchema>) {
    super(model)
  }
}
