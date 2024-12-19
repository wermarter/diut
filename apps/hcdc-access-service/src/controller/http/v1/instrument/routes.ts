import { CustomHttpRouteOptions } from '@diut/nestjs-infra'
import { HttpStatus, RequestMethod } from '@nestjs/common'
import {
  InstrumentResponseDto,
  InstrumentUnpopulatedResponseDto,
} from './dto/response-dto'
import { InstrumentSearchResponseDto } from './dto/search'

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
    serialize: InstrumentUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: InstrumentUnpopulatedResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: InstrumentUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: InstrumentUnpopulatedResponseDto,
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
    serialize: InstrumentUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: InstrumentUnpopulatedResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
