import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nestjs-infra'

import { TestCategorySearchResponseDto } from './dto/search.response-dto'
import {
  TestCategoryResponseDto,
  TestCategoryUnpopulatedResponseDto,
} from './dto/response-dto'

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
    serialize: TestCategoryUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: TestCategoryUnpopulatedResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: TestCategoryUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: TestCategoryUnpopulatedResponseDto,
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
    serialize: TestCategoryUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: TestCategoryUnpopulatedResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
