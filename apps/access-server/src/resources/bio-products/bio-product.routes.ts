import { Permission } from '@diut/common'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions, AppRouteOptions } from 'src/core'
import { SearchBioProductResponseDto } from './dtos/search-bio-product.response-dto'
import { BioProductResponseDto } from './dtos/bio-product.response-dto'

export const bioProductRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'bio-products',
  },

  search: <AppRouteOptions>{
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: SearchBioProductResponseDto,
    openApi: {
      responses: [
        {
          type: SearchBioProductResponseDto,
        },
      ],
    },
  },

  create: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
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

  updateById: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
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

  findById: <AppRouteOptions>{
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

  deleteById: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
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
