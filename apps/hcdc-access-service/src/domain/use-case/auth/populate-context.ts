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
      populates: [{ path: 'branches' }],
    })

    if (!user) {
      throw new EAuthnPayloadUserNotFound()
    }

    // create from user role and direct ability
    const ability = createMongoAbility([
      {
        action: 'manage',
        subject: 'all',
      },
      {
        action: BioProductAction.Create,
        subject: AuthSubject.BioProduct,
        conditions: {
          index: {
            $lt: 1000,
          },
        },
      },
      {
        action: BioProductAction.Read,
        subject: AuthSubject.BioProduct,
        conditions: {
          index: {
            $gt: 0,
          },
        },
      },
      {
        action: BioProductAction.Update,
        subject: AuthSubject.BioProduct,
        conditions: {
          index: {
            $gt: 2,
          },
        },
      },
      {
        action: BioProductAction.Delete,
        subject: AuthSubject.BioProduct,
        conditions: {
          index: 5,
        },
      },
    ])

    return { user, ability }
  }
}
