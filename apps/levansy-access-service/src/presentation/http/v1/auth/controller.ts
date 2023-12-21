import { CustomHttpController, CustomHttpRoute } from '@diut/nest-core'
import { Body } from '@nestjs/common'

import { AuthMeUseCase, AuthLoginUseCase } from 'src/domain'
import { AuthLoginRequestDto } from './dto/login.request-dto'
import { authRoutes } from './routes'
import { LoginResponseDto } from './dto/login.response-dto'
import { AuthMeResponseDto } from './dto/me.response-dto'
import { SkipJWTGuard } from 'src/infrastructure/authentication'

@CustomHttpController(authRoutes.controller)
export class AuthController {
  constructor(
    private authMeUseCase: AuthMeUseCase,
    private authLoginUseCase: AuthLoginUseCase,
  ) {}

  @CustomHttpRoute(authRoutes.login)
  @SkipJWTGuard
  async login(@Body() body: AuthLoginRequestDto): Promise<LoginResponseDto> {
    return this.authLoginUseCase.execute(body)
  }

  @CustomHttpRoute(authRoutes.me)
  async me(): Promise<AuthMeResponseDto> {
    return this.authMeUseCase.execute()
  }
}
