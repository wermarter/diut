import { CustomHttpController, CustomHttpRoute } from '@diut/nest-core'
import { Body } from '@nestjs/common'

import { AuthMeUseCase, AuthLoginUseCase } from 'src/domain'
import { AuthLoginRequestDto } from './dto/login.request-dto'
import { authRoutes } from './routes'
import { SkipJWTGuard } from 'src/infrastructure/auth'

@CustomHttpController(authRoutes.controller)
export class AuthController {
  constructor(
    private authMeUseCase: AuthMeUseCase,
    private authLoginUseCase: AuthLoginUseCase,
  ) {}

  @CustomHttpRoute(authRoutes.login)
  @SkipJWTGuard
  login(@Body() body: AuthLoginRequestDto) {
    return this.authLoginUseCase.execute(body)
  }

  @CustomHttpRoute(authRoutes.me)
  me() {
    return this.authMeUseCase.execute()
  }
}
