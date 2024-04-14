import { Inject, Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import { AuthSubject, UserAction } from '@diut/hcdc'

import {
  AuthContextToken,
  UserRepositoryToken,
  IAuthContext,
  IUserRepository,
  assertPermission,
} from 'src/domain'
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

  async execute(input: { id: string; newPassword: string }) {
    const entity = await this.userAssertExistsUseCase.execute({ _id: input.id })
    const { ability } = this.authContext.getData()
    assertPermission(
      ability,
      AuthSubject.User,
      UserAction.ChangePassword,
      entity,
    )

    const passwordHash = await argon2.hash(input.newPassword)
    return this.userRepository.update({ _id: input.id }, { passwordHash })
  }
}
