import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions } from '@diut/nest-core'
import { AppRouteOptions } from 'src/common/route.decorator'
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
