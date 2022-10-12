import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions, AppRouteOptions } from 'src/core'
import { LoginResponseDto, LoginBadRequestDto } from './dtos/login.response-dto'

export const authRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'auth',
  },

  login: <AppRouteOptions>{
    isPublic: true,
    path: 'login',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: LoginResponseDto,
    openApi: {
      responses: [
        {
          type: LoginResponseDto,
        },
        {
          status: HttpStatus.BAD_REQUEST,
          type: LoginBadRequestDto,
        },
      ],
    },
  },
}
