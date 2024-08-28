import { AuthSubject, User, UserAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  IUserRepository,
  USER_REPO_TOKEN,
} from 'src/domain'
import { UserAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class UserFindOneUseCase {
  constructor(
    @Inject(USER_REPO_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly userAuthorizePopulatesUseCase: UserAuthorizePopulatesUseCase,
  ) {}

  async execute(input: EntityFindOneOptions<User>) {
    input.populates = this.userAuthorizePopulatesUseCase.execute(
      input.populates,
    )
    const entity = await this.userRepository.findOne(input)
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.User, UserAction.Read, entity)

    return entity
  }
}
