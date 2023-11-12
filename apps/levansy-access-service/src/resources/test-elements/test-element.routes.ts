import { Permission } from '../../../../../libs/levansy-common/src'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions } from '@diut/server-core'
import { AppRouteOptions } from 'src/common/route.decorator'
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
    permissionAnyOf: [Permission.Admin],
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
    permissionAnyOf: [Permission.Admin],
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
    permissionAnyOf: [Permission.Admin],
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
