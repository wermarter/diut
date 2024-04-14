import { Inject, Injectable } from '@nestjs/common'
import { User } from '@diut/hcdc'

import {
  UserRepositoryToken,
  EntityFindOneOptions,
  IUserRepository,
  EEntityNotFound,
} from 'src/domain'

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
