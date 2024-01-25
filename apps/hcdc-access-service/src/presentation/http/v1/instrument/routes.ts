import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nest-core'

import { InstrumentSearchResponseDto } from './dto/search.response-dto'
import { InstrumentResponseDto } from './dto/response-dto'

export const instrumentRoutes = {
  search: {
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: InstrumentSearchResponseDto,
    openApi: {
      responses: [
        {
          type: InstrumentSearchResponseDto,
        },
      ],
    },
  },

  create: {
    method: RequestMethod.POST,
    serialize: InstrumentResponseDto,
    openApi: {
      responses: [
        {
          type: InstrumentResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: InstrumentResponseDto,
    openApi: {
      responses: [
        {
          type: InstrumentResponseDto,
        },
      ],
    },
  },

  findById: {
    path: ':id',
    method: RequestMethod.GET,
    serialize: InstrumentResponseDto,
    openApi: {
      responses: [
        {
          type: InstrumentResponseDto,
        },
      ],
    },
  },

  deleteById: {
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: InstrumentResponseDto,
    openApi: {
      responses: [
        {
          type: InstrumentResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
