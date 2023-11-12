import { Permission } from '../../../../../libs/levansy-common/src'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions } from '@diut/server-core'
import { AppRouteOptions } from 'src/common/route.decorator'
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
    permissionAnyOf: [Permission.Admin],
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
    permissionAnyOf: [Permission.Admin],
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
    permissionAnyOf: [Permission.Admin],
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
