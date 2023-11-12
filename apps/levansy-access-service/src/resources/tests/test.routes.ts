import { Permission } from '@diut/levansy-common'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions } from '@diut/server-core'
import { AppRouteOptions } from 'src/common/route.decorator'
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
    permissionAnyOf: [Permission.Admin],
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
    permissionAnyOf: [Permission.Admin],
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
    permissionAnyOf: [Permission.Admin],
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
