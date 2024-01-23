import { Inject, Injectable } from '@nestjs/common'

import { AuthSubject, UserAction, assertPermission } from 'src/domain/entity'
import {
  AuthContextToken,
  UserRepositoryToken,
  IAuthContext,
  IUserRepository,
} from 'src/domain/interface'
import { UserAssertExistsUseCase } from './assert-exists'

@Injectable()
export class UserDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    private readonly userAssertExistsUseCase: UserAssertExistsUseCase,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.userAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.User, UserAction.Delete, entity)

    await this.userRepository.deleteById(input.id)

    return entity
  }
}
