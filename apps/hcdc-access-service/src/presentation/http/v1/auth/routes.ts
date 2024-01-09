import {
  CustomHttpControllerOptions,
  CustomHttpRouteOptions,
} from '@diut/nest-core'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { LoginResponseDto } from './dto/login.response'

export const authRoutes = {
  controller: <CustomHttpControllerOptions>{
    basePath: 'v1/auth',
  },

  login: <CustomHttpRouteOptions>{
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
      ],
    },
  },

  me: <CustomHttpRouteOptions>{
    path: 'me',
    openApi: {
      responses: [
        {
          type: LoginResponseDto,
        },
      ],
    },
  },

  logout: <CustomHttpRouteOptions>{
    path: 'logout',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
  },
}
