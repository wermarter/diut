import { Permission } from '@diut/bathanghai-common'
import { HttpStatus, RequestMethod } from '@nestjs/common'
import { AppControllerOptions } from '@diut/server-core'

import { AppRouteOptions } from 'src/common/route.decorator'
import { SearchTestComboResponseDto } from './dtos/search-test-combo.response-dto'
import { TestComboResponseDto } from './dtos/test-combo.response-dto'

export const testComboRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'test-combos',
  },

  search: <AppRouteOptions>{
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: SearchTestComboResponseDto,
    openApi: {
      responses: [
        {
          type: SearchTestComboResponseDto,
        },
      ],
    },
  },

  create: <AppRouteOptions>{
    permissionAnyOf: [Permission.Admin],
    method: RequestMethod.POST,
    serialize: TestComboResponseDto,
    openApi: {
      responses: [
        {
          type: TestComboResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: <AppRouteOptions>{
    permissionAnyOf: [Permission.Admin],
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: TestComboResponseDto,
    openApi: {
      responses: [
        {
          type: TestComboResponseDto,
        },
      ],
    },
  },

  findById: <AppRouteOptions>{
    path: ':id',
    method: RequestMethod.GET,
    serialize: TestComboResponseDto,
    openApi: {
      responses: [
        {
          type: TestComboResponseDto,
        },
      ],
    },
  },

  deleteById: <AppRouteOptions>{
    permissionAnyOf: [Permission.Admin],
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: TestComboResponseDto,
    openApi: {
      responses: [
        {
          type: TestComboResponseDto,
        },
      ],
    },
  },
}
