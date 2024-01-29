import { CustomHttpRouteOptions } from '@diut/nestjs-core'
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
    serialize: AuthMeResponseDto,
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
