import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nest-core'

import { TestElementSearchResponseDto } from './dto/search.response-dto'
import { TestElementResponseDto } from './dto/response-dto'

export const testElementRoutes = {
  search: {
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: TestElementSearchResponseDto,
    openApi: {
      responses: [
        {
          type: TestElementSearchResponseDto,
        },
      ],
    },
  },

  create: {
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

  updateById: {
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

  findById: {
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

  deleteById: {
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
} satisfies Record<string, CustomHttpRouteOptions>
