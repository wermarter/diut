import { AuthSubject, UserAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

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
import { UserValidateUseCase } from './validate'

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
