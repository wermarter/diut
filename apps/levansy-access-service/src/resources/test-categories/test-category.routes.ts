import { Permission } from '../../../../../libs/levansy-common/src'
import { HttpStatus, RequestMethod } from '@nestjs/common'
import { AppControllerOptions } from '@diut/server-core'

import { AppRouteOptions } from 'src/common/route.decorator'
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
    permissionAnyOf: [Permission.Admin],
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
    permissionAnyOf: [Permission.Admin],
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
    permissionAnyOf: [Permission.Admin],
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
