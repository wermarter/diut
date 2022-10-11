import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as argon2 from 'argon2'

import { BaseMongoService } from 'src/clients/mongo'
import { User } from './user.schema'

@Injectable()
export class UserService extends BaseMongoService<User> {
  constructor(@InjectModel(User.name) model: Model<User>) {
    super(model, new Logger(UserService.name))
  }

  public async create(data: Partial<User>): Promise<User> {
    const plainPassword = data.password
    if (plainPassword === undefined) {
      throw new Error('Cannot create User without password')
    }

    const hashedPassword = await argon2.hash(plainPassword)

    return super.create({ ...data, password: hashedPassword })
  }
}
