import { Permission } from '@diut/common'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions, AppRouteOptions } from 'src/core'
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
    permissions: [Permission.ManageCore],
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
    permissions: [Permission.ManageCore],
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
    permissions: [Permission.ManageCore],
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
