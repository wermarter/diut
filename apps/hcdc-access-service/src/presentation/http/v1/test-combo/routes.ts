import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nest-core'

import { TestComboSearchResponseDto } from './dto/search.response-dto'
import { TestComboResponseDto } from './dto/response-dto'

export const testComboRoutes = {
  search: {
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: TestComboSearchResponseDto,
    openApi: {
      responses: [
        {
          type: TestComboSearchResponseDto,
        },
      ],
    },
  },

  create: {
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

  updateById: {
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

  findById: {
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

  deleteById: {
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
} satisfies Record<string, CustomHttpRouteOptions>
