import { Inject, Injectable } from '@nestjs/common'
import { AuthSubject, UserAction } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  USER_REPO_TOKEN,
  IAuthContext,
  IUserRepository,
  AUTH_SERVICE_TOKEN,
  IAuthService,
  AuthType,
  AuthContextData,
} from 'src/domain'
import { UserValidateUseCase } from './validate'
import { UserAssertExistsUseCase } from './assert-exists'
import { assertPermission } from 'src/app/auth/common'

type InputFilter = Parameters<IUserRepository['update']>[0]
type InputData = Parameters<IUserRepository['update']>[1]
type InputOptions = Parameters<IUserRepository['update']>[2]

@Injectable()
export class UserUpdateUseCase {
  constructor(
    @Inject(USER_REPO_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly userValidateUseCase: UserValidateUseCase,
    private readonly userAssertExistsUseCase: UserAssertExistsUseCase,
    @Inject(AUTH_SERVICE_TOKEN)
    private readonly authService: IAuthService,
  ) {}

  async execute(
    filter: Omit<InputFilter, 'passwordHash'>,
    data: Omit<InputData, 'passwordHash'>,
    options?: InputOptions,
  ) {
    delete filter.passwordHash
    delete data.passwordHash

    const entity = await this.userAssertExistsUseCase.execute(filter)
    const authContext = this.authContext.getData()
    assertPermission(
      authContext.ability,
      AuthSubject.User,
      UserAction.Update,
      entity,
    )
    await this.userValidateUseCase.execute(data)

    const rv = await this.userRepository.update(filter, data, options)

    if (rv !== null) {
      await this.authService.invalidate({
        type: AuthType.Internal,
        user: { _id: entity._id },
      } as AuthContextData)
    }

    return rv
  }
}
