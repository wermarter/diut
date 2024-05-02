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
import { UserAssertExistsUseCase } from './assert-exists'

@Injectable()
export class UserDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    private readonly userAssertExistsUseCase: UserAssertExistsUseCase,
    @Inject(AuthServiceToken)
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
