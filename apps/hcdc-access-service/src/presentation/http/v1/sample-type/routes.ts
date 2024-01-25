import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nest-core'

import { SampleTypeSearchResponseDto } from './dto/search.response-dto'
import { SampleTypeResponseDto } from './dto/response-dto'

export const sampleTypeRoutes = {
  search: {
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: SampleTypeSearchResponseDto,
    openApi: {
      responses: [
        {
          type: SampleTypeSearchResponseDto,
        },
      ],
    },
  },

  create: {
    method: RequestMethod.POST,
    serialize: SampleTypeResponseDto,
    openApi: {
      responses: [
        {
          type: SampleTypeResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: SampleTypeResponseDto,
    openApi: {
      responses: [
        {
          type: SampleTypeResponseDto,
        },
      ],
    },
  },

  findById: {
    path: ':id',
    method: RequestMethod.GET,
    serialize: SampleTypeResponseDto,
    openApi: {
      responses: [
        {
          type: SampleTypeResponseDto,
        },
      ],
    },
  },

  deleteById: {
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: SampleTypeResponseDto,
    openApi: {
      responses: [
        {
          type: SampleTypeResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
