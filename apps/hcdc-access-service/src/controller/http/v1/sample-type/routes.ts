import { CustomHttpRouteOptions } from '@diut/nestjs-infra'
import { HttpStatus, RequestMethod } from '@nestjs/common'
import {
  SampleTypeResponseDto,
  SampleTypeUnpopulatedResponseDto,
} from './dto/response-dto'
import { SampleTypeSearchResponseDto } from './dto/search'

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
    serialize: SampleTypeUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: SampleTypeUnpopulatedResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: SampleTypeUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: SampleTypeUnpopulatedResponseDto,
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
    serialize: SampleTypeUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: SampleTypeUnpopulatedResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
