import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nest-core'

import { RoleSearchResponseDto } from './dto/search.response-dto'
import { RoleResponseDto } from './dto/response-dto'

export const roleRoutes = {
  search: {
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: RoleSearchResponseDto,
    openApi: {
      responses: [
        {
          type: RoleSearchResponseDto,
        },
      ],
    },
  },

  create: {
    method: RequestMethod.POST,
    serialize: RoleResponseDto,
    openApi: {
      responses: [
        {
          type: RoleResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: RoleResponseDto,
    openApi: {
      responses: [
        {
          type: RoleResponseDto,
        },
      ],
    },
  },

  findById: {
    path: ':id',
    method: RequestMethod.GET,
    serialize: RoleResponseDto,
    openApi: {
      responses: [
        {
          type: RoleResponseDto,
        },
      ],
    },
  },

  deleteById: {
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: RoleResponseDto,
    openApi: {
      responses: [
        {
          type: RoleResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
