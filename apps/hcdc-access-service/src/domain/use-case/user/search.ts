import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'

import {
  AuthContextToken,
  UserRepositoryToken,
  IAuthContext,
  IUserRepository,
  EntitySearchOptions,
} from 'src/domain/interface'
import { User, UserAction } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'

@Injectable()
export class UserSearchUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
  ) {}

  async execute(input: EntitySearchOptions<User>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.User, UserAction.Read)

    const paginationResult = await this.userRepository.search({
      ...input,
      filter: {
        $and: [input.filter ?? {}, accessibleBy(ability, UserAction.Read).User],
      },
    })

    return paginationResult
  }
}
