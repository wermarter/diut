import { RequestMethod } from '@nestjs/common'

import { AppControllerOptions, AppRouteOptions } from 'src/core'
import { LoginResponseDto } from './dtos/login.response-dto'

export const authRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'auth',
  },

  login: <AppRouteOptions>{
    path: 'login',
    method: RequestMethod.POST,
    serialize: LoginResponseDto,
    openApi: {
      responses: [
        {
          type: LoginResponseDto,
        },
      ],
    },
  },
}
