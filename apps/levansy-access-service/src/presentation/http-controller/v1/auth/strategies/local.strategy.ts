import { LoginExceptionMsg } from '@diut/levansy-common'
import { Request } from 'express'
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { BadRequestException, Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import { validateDto } from '@diut/nest-core'

import { LOCAL_STRATEGY_KEY } from '../common'
import { AuthLoginRequestDto } from '../dto/login.request-dto'
import { UserFindOneUseCase } from 'src/domain'

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  LOCAL_STRATEGY_KEY,
) {
  constructor(private userFindOneUseCase: UserFindOneUseCase) {
    super({
      passReqToCallback: true,
    })
  }

  async validate(req: Request) {
    const { username, password } = await validateDto(
      req.body,
      AuthLoginRequestDto,
    )

    const user = await this.userFindOneUseCase.execute({ username })
    if (!user) {
      throw new BadRequestException(LoginExceptionMsg.USERNAME_NOT_EXIST)
    }

    const isCorrect = await argon2.verify(user.password, password)
    if (!isCorrect) {
      throw new BadRequestException(LoginExceptionMsg.WRONG_PASSWORD)
    }

    return user
  }
}
