import { Permission } from '@diut/common'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions, AppRouteOptions } from 'src/core'
import { SearchTestCategoryResponseDto } from './dtos/search-test-category.response-dto'
import { TestCategoryResponseDto } from './dtos/test-category.response-dto'

export const testCategoryRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'test-categories',
  },

  search: <AppRouteOptions>{
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: SearchTestCategoryResponseDto,
    openApi: {
      responses: [
        {
          type: SearchTestCategoryResponseDto,
        },
      ],
    },
  },

  create: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
    method: RequestMethod.POST,
    serialize: TestCategoryResponseDto,
    openApi: {
      responses: [
        {
          type: TestCategoryResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: TestCategoryResponseDto,
    openApi: {
      responses: [
        {
          type: TestCategoryResponseDto,
        },
      ],
    },
  },

  findById: <AppRouteOptions>{
    path: ':id',
    method: RequestMethod.GET,
    serialize: TestCategoryResponseDto,
    openApi: {
      responses: [
        {
          type: TestCategoryResponseDto,
        },
      ],
    },
  },

  deleteById: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: TestCategoryResponseDto,
    openApi: {
      responses: [
        {
          type: TestCategoryResponseDto,
        },
      ],
    },
  },
}
