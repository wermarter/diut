import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nest-core'

import { BioProductSearchResponseDto } from './dto/search.response-dto'
import { BioProductResponseDto } from './dto/response-dto'

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
    serialize: BioProductResponseDto,
    openApi: {
      responses: [
        {
          type: BioProductResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: BioProductResponseDto,
    openApi: {
      responses: [
        {
          type: BioProductResponseDto,
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
    serialize: BioProductResponseDto,
    openApi: {
      responses: [
        {
          type: BioProductResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
