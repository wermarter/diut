import { Inject, Injectable } from '@nestjs/common'
import { AuthSubject, User, UserAction } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  USER_REPO_TOKEN,
  EntityFindOneOptions,
  IAuthContext,
  IUserRepository,
} from 'src/domain'
import { assertPermission } from 'src/app/auth/common'
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
