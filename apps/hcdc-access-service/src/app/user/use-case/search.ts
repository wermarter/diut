import { accessibleBy } from '@casl/mongoose'
import { AuthSubject, User, UserAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EntitySearchOptions,
  IAuthContext,
  IUserRepository,
  USER_REPO_TOKEN,
} from 'src/domain'
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
