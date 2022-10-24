import { Permission } from '@diut/common'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions, AppRouteOptions } from 'src/core'
import { SearchUserResponseDto } from './dtos/search-user.response-dto'
import { UserBadRequestDto, UserResponseDto } from './dtos/user.response-dto'

export const userRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'users',
  },

  search: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: SearchUserResponseDto,
    openApi: {
      responses: [
        {
          type: SearchUserResponseDto,
        },
      ],
    },
  },

  create: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
    method: RequestMethod.POST,
    serialize: UserResponseDto,
    openApi: {
      responses: [
        {
          type: UserResponseDto,
          status: HttpStatus.CREATED,
        },
        {
          status: HttpStatus.BAD_REQUEST,
          type: UserBadRequestDto,
        },
      ],
    },
  },

  updateById: <AppRouteOptions>{
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: UserResponseDto,
    openApi: {
      responses: [
        {
          type: UserResponseDto,
        },
      ],
    },
  },

  findById: <AppRouteOptions>{
    path: ':id',
    method: RequestMethod.GET,
    serialize: UserResponseDto,
    openApi: {
      responses: [
        {
          type: UserResponseDto,
        },
      ],
    },
  },

  deleteById: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: UserResponseDto,
    openApi: {
      responses: [
        {
          type: UserResponseDto,
        },
      ],
    },
  },
}
