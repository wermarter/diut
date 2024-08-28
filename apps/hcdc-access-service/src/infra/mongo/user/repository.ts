import { MongoRepository } from '@diut/nestjs-infra'
import { InjectModel } from '@nestjs/mongoose'
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
