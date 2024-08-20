import { Inject, Injectable } from '@nestjs/common'
import { AuthSubject, BranchAction, UserAction } from '@diut/hcdc'

import {
  AuthContextData,
  AUTH_CONTEXT_TOKEN,
  AUTH_SERVICE_TOKEN,
  AuthType,
  IAuthContext,
  IAuthService,
  IRoleRepository,
  IUserRepository,
  ROLE_REPO_TOKEN,
  USER_REPO_TOKEN,
  assertPermission,
} from 'src/domain'
import { UserAssertExistsUseCase } from './assert-exists'
import { BranchAssertExistsUseCase } from 'src/app/branch'

@Injectable()
export class UserBranchDeauthorizeUseCase {
  constructor(
    @Inject(USER_REPO_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(ROLE_REPO_TOKEN)
    private readonly roleRepository: IRoleRepository,
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly userAssertExistsUseCase: UserAssertExistsUseCase,
    private readonly branchAssertExistsUseCase: BranchAssertExistsUseCase,
    @Inject(AUTH_SERVICE_TOKEN)
    private readonly authService: IAuthService,
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

    await this.authService.invalidate({
      type: AuthType.Internal,
      user: { _id: input.userId },
    } as AuthContextData)
  }
}
