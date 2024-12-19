import { AuthSubject, BranchAction, UserAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import { BranchAssertExistsUseCase } from 'src/app/branch/use-case/assert-exists'
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
export class UserBranchAuthorizeUseCase {
  constructor(
    @Inject(USER_REPO_TOKEN)
    private readonly userRepository: IUserRepository,
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
      BranchAction.AuthorizeUser,
      branch,
    )

    await this.userRepository.update(
      { _id: input.userId },
      { $addToSet: { branchIds: input.branchId } },
    )

    await this.authService.invalidate({
      type: AuthType.Internal,
      user: { _id: input.userId },
    } as AuthContextData)
  }
}
