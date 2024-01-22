import { Inject, Injectable } from '@nestjs/common'

import { AuthSubject, UserAction, assertPermission } from 'src/domain/entity'
import {
  AuthContextToken,
  UserRepositoryToken,
  IAuthContext,
  IUserRepository,
} from 'src/domain/interface'
import { UserFindOneUseCase } from './find-one'
import { EEntityNotFound } from 'src/domain/exception'

@Injectable()
export class UserDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    private readonly userFindOneUseCase: UserFindOneUseCase,
  ) {}

  async execute(input: { id: string }) {
    const { ability } = this.authContext.getData()

    const entity = await this.userFindOneUseCase.execute({
      filter: { _id: input.id },
    })

    if (entity == null) {
      throw new EEntityNotFound(`User ${JSON.stringify(input)}`)
    }

    assertPermission(ability, AuthSubject.User, UserAction.Delete, entity)

    await this.userRepository.deleteById(input.id)

    return entity
  }
}
