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

@Injectable()
export class UserDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(USER_REPO_TOKEN)
    private readonly userRepository: IUserRepository,
    private readonly userAssertExistsUseCase: UserAssertExistsUseCase,
    @Inject(AUTH_SERVICE_TOKEN)
    private readonly authService: IAuthService,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.userAssertExistsUseCase.execute({
      _id: input.id,
    })
    const authContext = this.authContext.getData()
    assertPermission(
      authContext.ability,
      AuthSubject.User,
      UserAction.Delete,
      entity,
    )

    await this.userRepository.deleteById(input.id)
    await this.authService.invalidate({
      type: AuthType.Internal,
      user: { _id: entity._id },
    } as AuthContextData)

    return entity
  }
}
