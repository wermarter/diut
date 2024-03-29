import { UserExceptionMsg } from '@diut/levansy-common'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, QueryOptions, UpdateQuery } from 'mongoose'
import * as argon2 from 'argon2'
import { BaseSchema, MongoRepository } from '@diut/nest-core'

import { User } from './user.schema'

@Injectable()
export class UserService extends MongoRepository<User> {
  constructor(@InjectModel(User.name) model: Model<User>) {
    super(model)
  }

  private async presaveUser(data: Omit<User, keyof BaseSchema>, isNew = true) {
    if (isNew && (await this.exists({ username: data.username }))) {
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

  public async create(data: Omit<User, keyof BaseSchema>): Promise<User> {
    if (data.password === undefined) {
      throw new Error('Cannot create User without password')
    }

    return await super.create(await this.presaveUser(data))
  }

  public async updateById(
    id: string,
    data: UpdateQuery<User>,
    options?: QueryOptions<User>,
  ) {
    return super.updateById(
      id,
      await this.presaveUser(data as any, false),
      options,
    )
  }
}
