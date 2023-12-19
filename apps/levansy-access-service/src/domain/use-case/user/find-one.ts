import { Inject } from '@nestjs/common'

import { IUseCase } from '../interface'
import {
  IUserRepository,
  UserRepositoryToken,
} from 'src/domain/interface/repository/user'
import { User } from 'src/domain/entity'
import { FilterQuery } from 'mongoose'

export type UserFindOneUseCaseInput = FilterQuery<User>
export type UserFindOneUseCaseOutput = User | null

export class UserFindOneUseCase
  implements IUseCase<UserFindOneUseCaseInput, UserFindOneUseCaseOutput>
{
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: UserFindOneUseCaseInput) {
    return await this.userRepository.findOne({ filter: input })
  }
}
