import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { User } from 'src/resources/users/user.schema'
import { AuthTokenPayload } from './auth.common'
import { LoginResponseDto } from './dtos/login.response-dto'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: User): Promise<LoginResponseDto> {
    const payload: AuthTokenPayload = {
      sub: user._id,
      permissions: user.permissions,
    }
    const generatedAccessToken = await this.jwtService.signAsync(payload)

    return {
      ...user,
      _id: user._id,
      generatedAccessToken,
    }
  }
}
