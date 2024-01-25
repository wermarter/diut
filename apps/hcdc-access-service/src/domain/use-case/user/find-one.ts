import { Inject, Injectable } from '@nestjs/common'

import { AuthSubject, assertPermission } from 'src/domain/auth'
import { User, UserAction } from 'src/domain/entity'
import {
  AuthContextToken,
  UserRepositoryToken,
  EntityFindOneOptions,
  IAuthContext,
  IUserRepository,
} from 'src/domain/interface'
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
