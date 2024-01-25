import { Inject, Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'

import { AuthSubject, assertPermission } from 'src/domain/auth'
import { UserAction } from 'src/domain/entity'
import {
  AuthContextToken,
  UserRepositoryToken,
  IAuthContext,
  IUserRepository,
} from 'src/domain/interface'
import { UserAssertExistsUseCase } from './assert-exists'

@Injectable()
export class UserChangePasswordUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly userAssertExistsUseCase: UserAssertExistsUseCase,
  ) {}

  async execute(id: string, newPassword: string) {
    const entity = await this.userAssertExistsUseCase.execute({ _id: id })
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.User,
      UserAction.ChangePassword,
      entity,
    )

    const passwordHash = await argon2.hash(newPassword)
    return this.userRepository.update({ _id: id }, { passwordHash })
  }
}
