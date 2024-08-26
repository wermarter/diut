import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nestjs-infra'

import { PrintFormSearchResponseDto } from './dto/search'
import {
  PrintFormResponseDto,
  PrintFormUnpopulatedResponseDto,
} from './dto/response-dto'

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
    serialize: PrintFormUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: PrintFormUnpopulatedResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: PrintFormUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: PrintFormUnpopulatedResponseDto,
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
    serialize: PrintFormUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: PrintFormUnpopulatedResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
