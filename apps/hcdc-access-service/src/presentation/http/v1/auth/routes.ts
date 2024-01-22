import { CustomHttpRouteOptions } from '@diut/nest-core'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { LoginResponseDto } from './dto/login.response-dto'
import { AuthMeResponseDto } from './dto/me.response-dto'

export const authRoutes = {
  login: {
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

  me: {
    path: 'me',
    openApi: {
      responses: [
        {
          type: AuthMeResponseDto,
        },
      ],
    },
  },

  logout: {
    path: 'logout',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
  },
} satisfies Record<string, CustomHttpRouteOptions>
