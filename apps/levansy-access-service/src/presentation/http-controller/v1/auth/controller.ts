import { CustomHttpController, CustomHttpRoute } from '@diut/nest-core'
import { Body, UseGuards } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { User, AuthMeUseCase } from 'src/domain'
import { AuthLoginRequestDto } from './dto/login.request-dto'
import { authRoutes } from './routes'
import { AuthTokenPayload, ReqUser, SkipJWTGuard } from './common'
import { JwtAuthGuard, LocalAuthGuard } from './guards'

@CustomHttpController(authRoutes.controller)
export class AuthController {
  constructor(
    private authMeUseCase: AuthMeUseCase,
    private jwtService: JwtService,
  ) {}

  @CustomHttpRoute(authRoutes.login)
  @UseGuards(LocalAuthGuard)
  @SkipJWTGuard
  async login(@ReqUser() user: User, @Body() body: AuthLoginRequestDto) {
    const payload: AuthTokenPayload = {
      sub: user._id,
    }
    const generatedAccessToken = await this.jwtService.signAsync(payload)

    return {
      ...user,
      _id: user._id,
      generatedAccessToken,
    }
  }

  @CustomHttpRoute({
    path: 'me',
  })
  @UseGuards(JwtAuthGuard)
  me() {
    return this.authMeUseCase.execute()
  }
}
