import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseMongoService } from 'src/clients/mongo'
import { User } from './user.schema'

@Injectable()
export class UserService
  extends BaseMongoService<User>
  implements OnModuleInit
{
  constructor(@InjectModel(User.name) model: Model<User>) {
    super(model, new Logger(UserService.name))
  }
  async onModuleInit() {
    this.logger.debug({ intent: 'database seeding' }, 'seeding 3 users')
    await this.model.deleteMany()
    await this.create({
      name: 'admin',
    })
    await this.create({ name: 'liyue' })
    await this.create({ name: 'inazuma' })
  }
}
