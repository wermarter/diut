import { HttpStatus, RequestMethod } from '@nestjs/common'
import {
  CustomHttpControllerOptions,
  CustomHttpRouteOptions,
} from '@diut/nest-core'

import { TestCategorySearchResponseDto } from './dto/search.response-dto'
import { TestCategoryResponseDto } from './dto/response-dto'

export const testCategoryRoutes = {
  controller: <CustomHttpControllerOptions>{
    basePath: 'v1/test-categories',
  },

  search: <CustomHttpRouteOptions>{
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: TestCategorySearchResponseDto,
    openApi: {
      responses: [
        {
          type: TestCategorySearchResponseDto,
        },
      ],
    },
  },

  create: <CustomHttpRouteOptions>{
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

  updateById: <CustomHttpRouteOptions>{
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

  findById: <CustomHttpRouteOptions>{
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

  deleteById: <CustomHttpRouteOptions>{
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
