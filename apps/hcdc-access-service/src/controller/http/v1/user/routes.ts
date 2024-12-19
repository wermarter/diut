import { CustomHttpRouteOptions } from '@diut/nestjs-infra'
import { HttpStatus, RequestMethod } from '@nestjs/common'
import { UserResponseDto } from './dto/response-dto'
import { UserSearchResponseDto } from './dto/search'

export const userRoutes = {
  search: {
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: UserSearchResponseDto,
    openApi: {
      responses: [
        {
          type: UserSearchResponseDto,
        },
      ],
    },
  },

  create: {
    method: RequestMethod.POST,
    serialize: UserResponseDto,
    openApi: {
      responses: [
        {
          type: UserResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
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

  changePassword: {
    path: ':id/change-password',
    method: RequestMethod.POST,
    serialize: UserResponseDto,
    openApi: {
      responses: [
        {
          type: UserResponseDto,
        },
      ],
    },
  },

  branchAuthorize: {
    path: ':userId/branch-authorize/:branchId',
    method: RequestMethod.POST,
  },

  branchDeauthorize: {
    path: ':userId/branch-deauthorize/:branchId',
    method: RequestMethod.POST,
  },

  findById: {
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

  deleteById: {
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
} satisfies Record<string, CustomHttpRouteOptions>
