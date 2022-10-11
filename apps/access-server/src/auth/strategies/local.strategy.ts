import { Request } from 'express'
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as argon2 from 'argon2'

import { LOCAL_STRATEGY_KEY } from '../auth.common'
import { UserService } from 'src/resources/users'
import { LoginRequestDto } from '../dtos/login.request-dto'
import { validateDto } from 'src/core'

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  LOCAL_STRATEGY_KEY
) {
  constructor(private userService: UserService) {
    super({
      passReqToCallback: true,
    })
  }

  async validate(req: Request) {
    const { username, password } = await validateDto(req.body, LoginRequestDto)

    const user = await this.userService.findOne({ filter: { username } })
    if (!user) {
      throw new UnauthorizedException('USERNAME_NOT_EXIST')
    }

    const isCorrect = await argon2.verify(user.password, password)
    if (!isCorrect) {
      throw new UnauthorizedException('WRONG_PASSWORD')
    }

    return user
  }
}
