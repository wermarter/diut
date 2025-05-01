import { AuthSubject, User, UserAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
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
import { UserSearchUseCase } from './search'

@Injectable()
export class UserDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(USER_REPO_TOKEN)
    private readonly userRepository: IUserRepository,
    private readonly userSearchUseCase: UserSearchUseCase,
    @Inject(AUTH_SERVICE_TOKEN)
    private readonly authService: IAuthService,
  ) {}

  async execute(input: FilterQuery<User>) {
    const authContext = this.authContext.getData()
    const { items: users } = await this.userSearchUseCase.execute({
      filter: input,
    })

    for (const user of users) {
      assertPermission(
        authContext.ability,
        AuthSubject.User,
        UserAction.Delete,
        user,
      )

      await this.userRepository.deleteById(user._id)

      await this.authService.invalidate({
        type: AuthType.Internal,
        user: { _id: user._id },
      } as AuthContextData)
    }
  }
}
