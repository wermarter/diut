import { CustomHttpController, CustomHttpRoute } from '@diut/nest-core'
import { Body } from '@nestjs/common'

import { AuthMeUseCase, AuthLoginUseCase } from 'src/domain'
import { AuthLoginRequestDto } from './dto/login.request-dto'
import { authRoutes } from './routes'
import { LoginResponseDto } from './dto/login.response-dto'
import { AuthMeResponseDto } from './dto/me.response-dto'
import { SkipAuthJWTGuard } from '../../common'

@CustomHttpController(authRoutes.controller)
export class AuthController {
  constructor(
    private authMeUseCase: AuthMeUseCase,
    private authLoginUseCase: AuthLoginUseCase,
  ) {}

  @CustomHttpRoute(authRoutes.login)
  @SkipAuthJWTGuard
  async login(@Body() body: AuthLoginRequestDto): Promise<LoginResponseDto> {
    return this.authLoginUseCase.execute(body)
  }

  @CustomHttpRoute(authRoutes.me)
  async me(): Promise<AuthMeResponseDto> {
    return this.authMeUseCase.execute()
  }
}
