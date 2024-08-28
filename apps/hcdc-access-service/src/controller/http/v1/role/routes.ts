import { CustomHttpRouteOptions } from '@diut/nestjs-infra'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { RoleResponseDto, RoleUnpopulatedResponseDto } from './dto/response-dto'
import { RoleSearchResponseDto } from './dto/search'

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
    serialize: RoleUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: RoleUnpopulatedResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: RoleUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: RoleUnpopulatedResponseDto,
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
    serialize: RoleUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: RoleUnpopulatedResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
