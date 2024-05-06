import { Inject, Injectable } from '@nestjs/common'
import { AuthSubject, BranchAction, UserAction } from '@diut/hcdc'

import {
  AuthContextToken,
  IAuthContext,
  IRoleRepository,
  IUserRepository,
  RoleRepositoryToken,
  UserRepositoryToken,
  assertPermission,
} from 'src/domain'
import { UserAssertExistsUseCase } from './assert-exists'
import { BranchAssertExistsUseCase } from 'src/app/branch'

@Injectable()
export class UserBranchDeauthorizeUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    @Inject(RoleRepositoryToken)
    private readonly roleRepository: IRoleRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly userAssertExistsUseCase: UserAssertExistsUseCase,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
  ) {}

  async execute(input: { userId: string; branchId: string }) {
    const authContext = this.authContext.getData()
    const user = await this.userAssertExistsUseCase.execute({
      _id: input.userId,
    })
    assertPermission(
      authContext.ability,
      AuthSubject.User,
      UserAction.Read,
      user,
    )

    const branch = await this.branchAssertExistsUseCase.execute({
      _id: input.branchId,
    })
    assertPermission(
      authContext.ability,
      AuthSubject.Branch,
      BranchAction.DeauthorizeUser,
      branch,
    )

    const branchRoles = await this.roleRepository.search({
      filter: { branchId: input.branchId },
      projection: { _id: 1 },
    })

    await this.userRepository.update(
      { _id: input.userId },
      {
        $pull: {
          branchIds: input.branchId,
          roleIds: { $in: branchRoles.items.map((r) => r._id) },
        },
      },
    )
  }
}
