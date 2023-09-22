import { Permission } from '@diut/bathanghai-common'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions } from '@diut/server-core'
import { AppRouteOptions } from 'src/common/route.decorator'
import { SearchUserResponseDto } from './dtos/search-user.response-dto'
import { UserBadRequestDto, UserResponseDto } from './dtos/user.response-dto'

export const userRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'users',
  },

  search: <AppRouteOptions>{
    permissionAnyOf: [Permission.Admin],
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
    permissionAnyOf: [Permission.Admin],
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
    permissionAnyOf: [Permission.Admin],
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
