import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nest-core'

import { PrintFormSearchResponseDto } from './dto/search.response-dto'
import { PrintFormResponseDto } from './dto/response-dto'

export const printFormRoutes = {
  search: {
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: PrintFormSearchResponseDto,
    openApi: {
      responses: [
        {
          type: PrintFormSearchResponseDto,
        },
      ],
    },
  },

  create: {
    method: RequestMethod.POST,
    serialize: PrintFormResponseDto,
    openApi: {
      responses: [
        {
          type: PrintFormResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: PrintFormResponseDto,
    openApi: {
      responses: [
        {
          type: PrintFormResponseDto,
        },
      ],
    },
  },

  findById: {
    path: ':id',
    method: RequestMethod.GET,
    serialize: PrintFormResponseDto,
    openApi: {
      responses: [
        {
          type: PrintFormResponseDto,
        },
      ],
    },
  },

  deleteById: {
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: PrintFormResponseDto,
    openApi: {
      responses: [
        {
          type: PrintFormResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
