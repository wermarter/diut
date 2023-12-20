import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { LoginExceptionMsg } from '@diut/levansy-common'
import * as argon2 from 'argon2'

import { IUseCase } from '../interface'
import { UserFindOneUseCase } from '../user/find-one'
import { User } from 'src/domain/entity'
import { JwtService } from '@nestjs/jwt'
import { AuthPayload } from 'src/domain/interface'

export type AuthLoginUseCaseInput = { username: string; password: string }
export type AuthLoginUseCaseOutput = User & { jwtAccessToken: string }

@Injectable()
export class AuthLoginUseCase
  implements IUseCase<AuthLoginUseCaseInput, AuthLoginUseCaseOutput>
{
  constructor(
    private userFindOneUseCase: UserFindOneUseCase,
    private jwtService: JwtService,
  ) {}

  async execute(input: AuthLoginUseCaseInput) {
    const { username, password } = input

    const user = await this.userFindOneUseCase.execute({ username })
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
