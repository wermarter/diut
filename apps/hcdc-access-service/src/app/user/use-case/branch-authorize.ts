import { Inject, Injectable } from '@nestjs/common'
import { AuthSubject, BranchAction, UserAction } from '@diut/hcdc'

import {
  AuthContextToken,
  IAuthContext,
  IUserRepository,
  UserRepositoryToken,
  assertPermission,
} from 'src/domain'
import { UserAssertExistsUseCase } from './assert-exists'
import { BranchAssertExistsUseCase } from 'src/app/branch'

@Injectable()
export class UserBranchAuthorizeUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
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
      BranchAction.AuthorizeUser,
      branch,
    )

    await this.userRepository.update(
      { _id: input.userId },
      { $addToSet: { branchIds: input.branchId } },
    )
  }
}
