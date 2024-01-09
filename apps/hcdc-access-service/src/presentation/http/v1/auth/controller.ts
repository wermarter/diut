import { Body, Res } from '@nestjs/common'
import { Response } from 'express'

import { AuthMeUseCase, AuthLoginUseCase } from 'src/domain'
import { AuthLoginRequestDto } from './dto/login.request'
import { authRoutes } from './routes'
import { LoginResponseDto } from './dto/login.response'
import { AuthMeResponseDto } from './dto/me.response'
import {
  AuthCookieService,
  HttpController,
  HttpPublicRoute,
  HttpRoute,
} from '../../common'

@HttpController(authRoutes.controller)
export class AuthController {
  constructor(
    private authMeUseCase: AuthMeUseCase,
    private authLoginUseCase: AuthLoginUseCase,
    private authCookieService: AuthCookieService,
  ) {}

  @HttpRoute(authRoutes.login)
  @HttpPublicRoute
  async login(
    @Body() body: AuthLoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
    const { user, accessToken } = await this.authLoginUseCase.execute(body)

    this.authCookieService.setAuthCookie(res, { accessToken })

    return user
  }

  @HttpRoute(authRoutes.me)
  me(): AuthMeResponseDto {
    return this.authMeUseCase.execute()
  }

  @HttpRoute(authRoutes.logout)
  logout(@Res({ passthrough: true }) res: Response): void {
    this.authCookieService.clearAuthCookie(res)
  }
}
