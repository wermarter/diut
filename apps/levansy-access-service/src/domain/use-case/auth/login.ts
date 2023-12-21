import { BadRequestException, Injectable } from '@nestjs/common'
import { LoginExceptionMsg } from '@diut/levansy-common'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'

import { UserFindOneUseCase } from '../user/find-one'
import { AuthPayload } from 'src/infrastructure/authentication'

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
      // TODO: abtract domain exception and logging
      throw new BadRequestException(LoginExceptionMsg.USERNAME_NOT_EXIST)
    }

    const isCorrect = await argon2.verify(user.password, password)
    if (!isCorrect) {
      throw new BadRequestException(LoginExceptionMsg.WRONG_PASSWORD)
    }

    const authPayload: AuthPayload = {
      userId: user._id,
    }
    const jwtAccessToken = await this.jwtService.signAsync(authPayload)

    return { ...user, jwtAccessToken }
  }
}
