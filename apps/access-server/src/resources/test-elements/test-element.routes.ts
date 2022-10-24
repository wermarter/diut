import { Permission } from '@diut/common'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions, AppRouteOptions } from 'src/core'
import { SearchTestElementResponseDto } from './dtos/search-test-element.response-dto'
import { TestElementResponseDto } from './dtos/test-element.response-dto'

export const testElementRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'test-elements',
  },

  search: <AppRouteOptions>{
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: SearchTestElementResponseDto,
    openApi: {
      responses: [
        {
          type: SearchTestElementResponseDto,
        },
      ],
    },
  },

  create: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
    method: RequestMethod.POST,
    serialize: TestElementResponseDto,
    openApi: {
      responses: [
        {
          type: TestElementResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: TestElementResponseDto,
    openApi: {
      responses: [
        {
          type: TestElementResponseDto,
        },
      ],
    },
  },

  findById: <AppRouteOptions>{
    path: ':id',
    method: RequestMethod.GET,
    serialize: TestElementResponseDto,
    openApi: {
      responses: [
        {
          type: TestElementResponseDto,
        },
      ],
    },
  },

  deleteById: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: TestElementResponseDto,
    openApi: {
      responses: [
        {
          type: TestElementResponseDto,
        },
      ],
    },
  },
}
