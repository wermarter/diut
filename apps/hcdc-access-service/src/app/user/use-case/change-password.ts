import { Inject, Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import { AuthSubject, UserAction } from '@diut/hcdc'

import {
  AuthContextToken,
  UserRepositoryToken,
  IAuthContext,
  IUserRepository,
  assertPermission,
  AuthServiceToken,
  IAuthService,
  AuthType,
  AuthContextData,
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
    @Inject(AuthServiceToken)
    private readonly authService: IAuthService,
  ) {}

  async execute(input: { id: string; newPassword: string }) {
    const entity = await this.userAssertExistsUseCase.execute({ _id: input.id })
    const authContext = this.authContext.getData()
    assertPermission(
      authContext.ability,
      AuthSubject.User,
      UserAction.ChangePassword,
      entity,
    )

    const passwordHash = await argon2.hash(input.newPassword)
    const rv = this.userRepository.update({ _id: input.id }, { passwordHash })

    if (rv !== null) {
      await this.authService.invalidate({
        type: AuthType.Internal,
        user: { _id: input.id },
      } as AuthContextData)
    }

    return rv
  }
}
