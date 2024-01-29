import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nestjs-core'

import { TestComboSearchResponseDto } from './dto/search.response-dto'
import {
  TestComboResponseDto,
  TestComboUnpopulatedResponseDto,
} from './dto/response-dto'

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
    serialize: TestComboUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: TestComboUnpopulatedResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: TestComboUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: TestComboUnpopulatedResponseDto,
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
    serialize: TestComboUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: TestComboUnpopulatedResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
