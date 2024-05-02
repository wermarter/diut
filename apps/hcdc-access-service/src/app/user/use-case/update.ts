import { Inject, Injectable } from '@nestjs/common'
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
import { UserValidateUseCase } from './validate'
import { UserAssertExistsUseCase } from './assert-exists'

type InputFilter = Parameters<IUserRepository['update']>[0]
type InputData = Parameters<IUserRepository['update']>[1]
type InputOptions = Parameters<IUserRepository['update']>[2]

@Injectable()
export class UserUpdateUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly userValidateUseCase: UserValidateUseCase,
    private readonly userAssertExistsUseCase: UserAssertExistsUseCase,
    @Inject(AuthServiceToken)
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
