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
import { UserAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class UserSearchUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly userAuthorizePopulatesUseCase: UserAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntitySearchOptions<User>) {
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.User, UserAction.Read)
    input.populates = this.userAuthorizePopulatesUseCase.execute(
      input.populates,
    )

    const paginationResult = await this.userRepository.search({
      ...input,
      filter: {
        $and: [input.filter ?? {}, accessibleBy(ability, UserAction.Read).User],
      },
    })

    return paginationResult
  }
}
