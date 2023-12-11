import { Permission } from '@diut/levansy-common'
import { HttpStatus, RequestMethod } from '@nestjs/common'
import { AppControllerOptions } from '@diut/nest-core'

import { AppRouteOptions } from 'src/common/route.decorator'
import { BioProductSearchResponseDto, BioProductResponseDto } from './dto'

export const bioProductRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'v1/bio-products',
  },

  hello: <AppRouteOptions>{
    path: 'hello',
    isPublic: true,
  },

  search: <AppRouteOptions>{
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

  create: <AppRouteOptions>{
    permissionAnyOf: [Permission.Admin],
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
    permissionAnyOf: [Permission.Admin],
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
    permissionAnyOf: [Permission.Admin],
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
