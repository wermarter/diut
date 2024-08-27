import { CustomHttpRouteOptions } from '@diut/nestjs-infra'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { LoginResponseDto } from './dto/login'
import { MeResponseDto } from './dto/me'

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
    serialize: MeResponseDto,
    openApi: {
      responses: [
        {
          type: MeResponseDto,
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
