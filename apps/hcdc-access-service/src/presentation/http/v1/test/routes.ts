import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nest-core'

import { TestSearchResponseDto } from './dto/search.response-dto'
import { TestResponseDto } from './dto/response-dto'

export const testRoutes = {
  search: {
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: TestSearchResponseDto,
    openApi: {
      responses: [
        {
          type: TestSearchResponseDto,
        },
      ],
    },
  },

  create: {
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

  updateById: {
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

  findById: {
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

  deleteById: {
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
} satisfies Record<string, CustomHttpRouteOptions>
