import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nestjs-core'

import { SampleSearchResponseDto } from './dto/search.response-dto'
import {
  SampleResponseDto,
  SampleUnpopulatedResponseDto,
} from './dto/response-dto'

export const sampleRoutes = {
  search: {
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: SampleSearchResponseDto,
    openApi: {
      responses: [
        {
          type: SampleSearchResponseDto,
        },
      ],
    },
  },

  create: {
    method: RequestMethod.POST,
    serialize: SampleUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: SampleUnpopulatedResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: SampleUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: SampleUnpopulatedResponseDto,
        },
      ],
    },
  },

  findById: {
    path: ':id',
    method: RequestMethod.GET,
    serialize: SampleResponseDto,
    openApi: {
      responses: [
        {
          type: SampleResponseDto,
        },
      ],
    },
  },

  deleteById: {
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: SampleUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: SampleUnpopulatedResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
