import { Inject, Injectable } from '@nestjs/common'
import { accessibleBy } from '@casl/mongoose'
import { User, UserAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  USER_REPO_TOKEN,
  IAuthContext,
  IUserRepository,
  EntitySearchOptions,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
import { UserAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class UserSearchUseCase {
  constructor(
    @Inject(USER_REPO_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
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
        $and: [
          input.filter ?? {},
          accessibleBy(ability, UserAction.Read).ofType(AuthSubject.User),
        ],
      },
    })

    return paginationResult
  }
}
