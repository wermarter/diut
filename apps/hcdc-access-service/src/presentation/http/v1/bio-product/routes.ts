import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nestjs-core'

import { BioProductSearchResponseDto } from './dto/search.response-dto'
import {
  BioProductResponseDto,
  BioProductUnpopulatedResponseDto,
} from './dto/response-dto'

export const bioProductRoutes = {
  search: {
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: BioProductSearchResponseDto,
    openApi: {
      responses: [
        {
          type: BioProductSearchResponseDto,
        },
      ],
    },
  },

  create: {
    method: RequestMethod.POST,
    serialize: BioProductUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: BioProductUnpopulatedResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: BioProductUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: BioProductUnpopulatedResponseDto,
        },
      ],
    },
  },

  findById: {
    path: ':id',
    method: RequestMethod.GET,
    serialize: BioProductResponseDto,
    openApi: {
      responses: [
        {
          type: BioProductResponseDto,
        },
      ],
    },
  },

  deleteById: {
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: BioProductUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: BioProductUnpopulatedResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
