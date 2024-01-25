import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nest-core'

import { TestCategorySearchResponseDto } from './dto/search.response-dto'
import { TestCategoryResponseDto } from './dto/response-dto'

export const testCategoryRoutes = {
  search: {
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

  create: {
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

  updateById: {
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

  findById: {
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

  deleteById: {
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
} satisfies Record<string, CustomHttpRouteOptions>
