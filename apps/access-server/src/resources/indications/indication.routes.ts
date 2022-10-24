import { Permission } from '@diut/common'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions, AppRouteOptions } from 'src/core'
import { SearchIndicationResponseDto } from './dtos/search-indication.response-dto'
import { IndicationResponseDto } from './dtos/indication.response-dto'

export const indicationRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'indications',
  },

  search: <AppRouteOptions>{
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: SearchIndicationResponseDto,
    openApi: {
      responses: [
        {
          type: SearchIndicationResponseDto,
        },
      ],
    },
  },

  create: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
    method: RequestMethod.POST,
    serialize: IndicationResponseDto,
    openApi: {
      responses: [
        {
          type: IndicationResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: IndicationResponseDto,
    openApi: {
      responses: [
        {
          type: IndicationResponseDto,
        },
      ],
    },
  },

  findById: <AppRouteOptions>{
    path: ':id',
    method: RequestMethod.GET,
    serialize: IndicationResponseDto,
    openApi: {
      responses: [
        {
          type: IndicationResponseDto,
        },
      ],
    },
  },

  deleteById: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: IndicationResponseDto,
    openApi: {
      responses: [
        {
          type: IndicationResponseDto,
        },
      ],
    },
  },
}
