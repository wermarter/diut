import { Inject, Injectable } from '@nestjs/common'

import { User } from 'src/domain/entity'
import { EEntityNotFound } from 'src/domain/exception'
import {
  UserRepositoryToken,
  EntityFindOneOptions,
  IUserRepository,
} from 'src/domain/interface'

@Injectable()
export class UserAssertExistsUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: EntityFindOneOptions<User>['filter']) {
    const rv = await this.userRepository.findOne({ filter: input })

    if (rv == null) {
      throw new EEntityNotFound(`User ${JSON.stringify(input)}`)
    }

    return rv
  }
}
