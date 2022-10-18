import { Role } from '@diut/common'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions, AppRouteOptions } from 'src/core'
import { SearchTestResponseDto } from './dtos/search-test.response-dto'
import { TestResponseDto } from './dtos/test.response-dto'

export const testRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'tests',
  },

  search: <AppRouteOptions>{
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: SearchTestResponseDto,
    openApi: {
      responses: [
        {
          type: SearchTestResponseDto,
        },
      ],
    },
  },

  create: <AppRouteOptions>{
    roles: [Role.Admin],
    method: RequestMethod.POST,
    serialize: TestResponseDto,
    openApi: {
      responses: [
        {
          type: TestResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: <AppRouteOptions>{
    roles: [Role.Admin],
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: TestResponseDto,
    openApi: {
      responses: [
        {
          type: TestResponseDto,
        },
      ],
    },
  },

  findById: <AppRouteOptions>{
    path: ':id',
    method: RequestMethod.GET,
    serialize: TestResponseDto,
    openApi: {
      responses: [
        {
          type: TestResponseDto,
        },
      ],
    },
  },

  deleteById: <AppRouteOptions>{
    roles: [Role.Admin],
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: TestResponseDto,
    openApi: {
      responses: [
        {
          type: TestResponseDto,
        },
      ],
    },
  },
}