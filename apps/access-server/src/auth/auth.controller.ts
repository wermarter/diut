import { Body, Logger, UseGuards } from '@nestjs/common'

import { AppController, AppRoute } from 'src/core'
import { User } from 'src/resources/users'
import { ReqUser } from './auth.common'
import { authRoutes } from './auth.routes'
import { AuthService } from './auth.service'
import { LoginRequestDto } from './dtos/login.request-dto'
import { LocalAuthGuard } from './guards/local-auth.guard'

@AppController(authRoutes.controller)
export class AuthController {
  private logger: Logger
  constructor(private authService: AuthService) {
    this.logger = new Logger(AuthController.name)
  }

  @UseGuards(LocalAuthGuard)
  @AppRoute(authRoutes.login)
  login(@ReqUser() user: User, @Body() body: LoginRequestDto) {
    return this.authService.login(user)
  }
}
