import { Inject } from '@nestjs/common'

import { EAuthzUserNotFound } from 'src/domain/exception'
import {
  AuthContextData,
  AuthPayload,
  IUserRepository,
  UserRepositoryToken,
} from 'src/domain/interface'

export class AuthPopulateContextUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: AuthPayload): Promise<AuthContextData> {
    const user = await this.userRepository.findOne({
      filter: { _id: input.userId },
    })

    if (!user) {
      throw new EAuthzUserNotFound()
    }

    return { user }
  }
}
