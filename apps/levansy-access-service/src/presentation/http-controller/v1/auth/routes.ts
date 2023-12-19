import {
  CustomHttpControllerOptions,
  CustomHttpRouteOptions,
} from '@diut/nest-core'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { LoginBadRequestDto, LoginResponseDto } from './dto/login.response-dto'

export const authRoutes = {
  controller: <CustomHttpControllerOptions>{
    basePath: 'auth',
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
        {
          status: HttpStatus.BAD_REQUEST,
          type: LoginBadRequestDto,
        },
      ],
    },
  },

  me: <CustomHttpRouteOptions>{
    path: 'me',
  },
}
