import { Inject, Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'

import {
  AuthPayload,
  IUserRepository,
  UserRepositoryToken,
} from 'src/domain/interface'
import {
  EAuthnLoginInvalidPassword,
  EAuthnLoginInvalidUsername,
} from 'src/domain/exception'

@Injectable()
export class AuthLoginUseCase {
  constructor(
    @Inject(UserRepositoryToken) private userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  async execute({
    username,
    password,
  }: {
    username: string
    password: string
  }) {
    const user = await this.userRepository.findOne({ filter: { username } })
    if (!user) {
      throw new EAuthnLoginInvalidUsername()
    }

    const isCorrect = await argon2.verify(user.passwordHash, password)
    if (!isCorrect) {
      throw new EAuthnLoginInvalidPassword()
    }

    const authPayload: AuthPayload = {
      userId: user._id,
    }
    const accessToken = await this.jwtService.signAsync(authPayload)

    return { user, accessToken }
  }
}
