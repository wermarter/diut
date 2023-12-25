import { Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'

import { UserFindOneUseCase } from '../user/find-one'
import { AuthPayload } from 'src/domain/interface'
import {
  EAuthnLoginInvalidPassword,
  EAuthnLoginInvalidUsername,
} from 'src/domain'

@Injectable()
export class AuthLoginUseCase {
  constructor(
    private userFindOneUseCase: UserFindOneUseCase,
    private jwtService: JwtService,
  ) {}

  async execute({
    username,
    password,
  }: {
    username: string
    password: string
  }) {
    const user = await this.userFindOneUseCase.execute({ filter: { username } })
    if (!user) {
      throw new EAuthnLoginInvalidUsername()
    }

    const isCorrect = await argon2.verify(user.password, password)
    if (!isCorrect) {
      throw new EAuthnLoginInvalidPassword()
    }

    const authPayload: AuthPayload = {
      userId: user._id,
    }
    const jwtAccessToken = await this.jwtService.signAsync(authPayload)

    return { user, jwtAccessToken }
  }
}
