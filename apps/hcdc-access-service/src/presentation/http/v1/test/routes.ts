import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nest-core'

import { TestSearchResponseDto } from './dto/search.response-dto'
import { TestResponseDto, TestUnpopulatedResponseDto } from './dto/response-dto'

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
    serialize: TestUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: TestUnpopulatedResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: TestUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: TestUnpopulatedResponseDto,
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
    serialize: TestUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: TestUnpopulatedResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
