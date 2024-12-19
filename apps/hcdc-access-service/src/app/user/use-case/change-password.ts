import { AuthSubject, UserAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  AUTH_SERVICE_TOKEN,
  AuthContextData,
  AuthType,
  IAuthContext,
  IAuthService,
  IUserRepository,
  USER_REPO_TOKEN,
} from 'src/domain'
import { UserAssertExistsUseCase } from './assert-exists'

@Injectable()
export class UserChangePasswordUseCase {
  constructor(
    @Inject(USER_REPO_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly userAssertExistsUseCase: UserAssertExistsUseCase,
    @Inject(AUTH_SERVICE_TOKEN)
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
