import { createMongoAbility } from '@casl/ability'
import { Inject } from '@nestjs/common'
import { AuthSubject, BioProductAction } from 'src/domain/entity'

import { EAuthnPayloadUserNotFound } from 'src/domain/exception'
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
      throw new EAuthnPayloadUserNotFound()
    }

    // create from user role and direct ability
    const ability = createMongoAbility([
      {
        action: BioProductAction.Delete,
        subject: AuthSubject.BioProduct,
      },
    ])

    return { user, ability }
  }
}
