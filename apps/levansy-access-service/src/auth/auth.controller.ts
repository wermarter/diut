import { Body, UseGuards } from '@nestjs/common'

import { AppController } from '@diut/server-core'
import { AppRoute } from 'src/common/route.decorator'
import { User } from 'src/resources/users/user.schema'
import { ReqUser } from './auth.common'
import { authRoutes } from './auth.routes'
import { AuthService } from './auth.service'
import { LoginRequestDto } from './dtos/login.request-dto'
import { LocalAuthGuard } from './guards/local-auth.guard'

@AppController(authRoutes.controller)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @AppRoute(authRoutes.login)
  login(@ReqUser() user: User, @Body() body: LoginRequestDto) {
    // body is validated in LocalAuthGuard
    return this.authService.login(user)
  }
}
