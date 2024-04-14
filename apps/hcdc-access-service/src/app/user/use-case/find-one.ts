import { Inject, Injectable } from '@nestjs/common'
import { AuthSubject, User, UserAction } from '@diut/hcdc'

import {
  AuthContextToken,
  UserRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  IUserRepository,
  assertPermission,
} from 'src/domain'
import { UserAuthorizePopulatesUseCase } from './authorize-populates'

@Injectable()
export class UserFindOneUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    @Inject(AuthContextToken)
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
