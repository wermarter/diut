import { HttpStatus, RequestMethod } from '@nestjs/common'
import {
  CustomHttpControllerOptions,
  CustomHttpRouteOptions,
} from '@diut/nest-core'

import { RoleSearchResponseDto } from './dto/search.response-dto'
import { RoleResponseDto } from './dto/response-dto'

export const roleRoutes = {
  controller: <CustomHttpControllerOptions>{
    basePath: 'v1/bio-products',
  },

  search: <CustomHttpRouteOptions>{
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

  create: <CustomHttpRouteOptions>{
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

  updateById: <CustomHttpRouteOptions>{
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

  findById: <CustomHttpRouteOptions>{
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

  deleteById: <CustomHttpRouteOptions>{
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
}
