import { Inject, Injectable } from '@nestjs/common'

import { AuthSubject, UserAction, assertPermission } from 'src/domain/entity'
import {
  AuthContextToken,
  UserRepositoryToken,
  IAuthContext,
  IUserRepository,
} from 'src/domain/interface'
import { EEntityNotFound } from 'src/domain/exception'
import { BranchAssertExistsUseCase } from '../branch/assert-exists'
import { RoleAssertExistsUseCase } from '../role/assert-exists'

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
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
    private readonly roleAssertExistsUseCase: RoleAssertExistsUseCase,
  ) {}

  async execute(
    filter: Omit<InputFilter, 'passwordHash'>,
    data: Omit<InputData, 'passwordHash'>,
    options?: InputOptions,
  ) {
    const { ability } = this.authContext.getData()

    const entity = await this.userRepository.findOne({
      filter,
    })

    if (entity === null) {
      throw new EEntityNotFound(`User ${JSON.stringify(filter)}`)
    }

    assertPermission(ability, AuthSubject.User, UserAction.Update, entity)

    if (data?.branchIds?.length! > 0) {
      for (const branchId of data.branchIds) {
        await this.branchAssertExistsUseCase.execute({
          _id: branchId,
        })
      }
    }

    if (data?.roleIds?.length! > 0) {
      for (const roleId of data.roleIds) {
        await this.roleAssertExistsUseCase.execute({
          _id: roleId,
        })
      }
    }

    return this.userRepository.update(filter, data, options)
  }
}
