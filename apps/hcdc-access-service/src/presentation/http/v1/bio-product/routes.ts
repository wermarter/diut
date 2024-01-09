import { HttpStatus, RequestMethod } from '@nestjs/common'
import {
  CustomHttpControllerOptions,
  CustomHttpRouteOptions,
} from '@diut/nest-core'

import { BioProductSearchResponseDto } from './dto/search.response-dto'
import { BioProductResponseDto } from './dto/response-dto'

export const bioProductRoutes = {
  controller: <CustomHttpControllerOptions>{
    basePath: 'v1/bio-products',
  },

  search: <CustomHttpRouteOptions>{
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

  create: <CustomHttpRouteOptions>{
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

  updateById: <CustomHttpRouteOptions>{
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

  findById: <CustomHttpRouteOptions>{
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

  deleteById: <CustomHttpRouteOptions>{
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
}
