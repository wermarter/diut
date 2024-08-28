import { User } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import {
  EEntityNotFound,
  EntityFindOneOptions,
  IUserRepository,
  USER_REPO_TOKEN,
} from 'src/domain'

@Injectable()
export class UserAssertExistsUseCase {
  constructor(
    @Inject(USER_REPO_TOKEN)
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
