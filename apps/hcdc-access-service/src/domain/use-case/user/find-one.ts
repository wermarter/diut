import { Inject } from '@nestjs/common'

import { IUserRepository, UserRepositoryToken } from 'src/domain/interface'

export class UserFindOneUseCase {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: Parameters<IUserRepository['findOne']>[0]) {
    return await this.userRepository.findOne(input)
  }
}
