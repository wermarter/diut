import { Inject, Injectable } from '@nestjs/common'

import { AuthSubject, UserAction, assertPermission } from 'src/domain/entity'
import {
  AuthContextToken,
  UserRepositoryToken,
  IAuthContext,
  IUserRepository,
} from 'src/domain/interface'
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
  ) {}

  async execute(
    filter: Omit<InputFilter, 'passwordHash'>,
    data: Omit<InputData, 'passwordHash'>,
    options?: InputOptions,
  ) {
    const entity = await this.userAssertExistsUseCase.execute(filter)
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.User, UserAction.Update, entity)
    await this.userValidateUseCase.execute({
      branchIds: data?.branchIds,
      roleIds: data?.roleIds,
    })

    return this.userRepository.update(filter, data, options)
  }
}
