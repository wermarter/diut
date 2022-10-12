import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, QueryOptions, UpdateQuery } from 'mongoose'
import * as argon2 from 'argon2'

import { BaseMongoService } from 'src/clients/mongo'
import { User } from './user.schema'
import { UserExceptionMsg } from './user.common'

@Injectable()
export class UserService extends BaseMongoService<User> {
  constructor(@InjectModel(User.name) model: Model<User>) {
    super(model, new Logger(UserService.name))
  }

  private async presaveUser(data: Partial<User>) {
    if (await this.exists({ username: data.username })) {
      throw new BadRequestException(UserExceptionMsg.USERNAME_EXISTED)
    }

    let password = data.password
    if (password?.length > 0) {
      password = await argon2.hash(password)
    }

    return {
      ...data,
      password,
    }
  }

  public async create(data: Partial<User>): Promise<User> {
    if (data.password === undefined) {
      throw new Error('Cannot create User without password')
    }

    return await super.create(await this.presaveUser(data))
  }

  public async updateById(
    id: string,
    data: UpdateQuery<User>,
    options?: QueryOptions<User>
  ) {
    return super.updateById(
      id,
      await this.presaveUser(data as unknown),
      options
    )
  }
}
