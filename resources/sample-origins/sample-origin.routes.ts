import { Permission } from '@diut/levansy-common'
import { HttpStatus, RequestMethod } from '@nestjs/common'
import { AppControllerOptions } from '@diut/nest-core'

import { AppRouteOptions } from 'src/common/route.decorator'
import { SearchSampleOriginResponseDto } from './dtos/search-sample-origin.response-dto'
import { SampleOriginResponseDto } from './dtos/sample-origin.response-dto'

export const SampleOriginRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'sample-origins',
  },

  search: <AppRouteOptions>{
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: SearchSampleOriginResponseDto,
    openApi: {
      responses: [
        {
          type: SearchSampleOriginResponseDto,
        },
      ],
    },
  },

  create: <AppRouteOptions>{
    permissionAnyOf: [Permission.Admin],
    method: RequestMethod.POST,
    serialize: SampleOriginResponseDto,
    openApi: {
      responses: [
        {
          type: SampleOriginResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: <AppRouteOptions>{
    permissionAnyOf: [Permission.Admin],
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: SampleOriginResponseDto,
    openApi: {
      responses: [
        {
          type: SampleOriginResponseDto,
        },
      ],
    },
  },

  findById: <AppRouteOptions>{
    path: ':id',
    method: RequestMethod.GET,
    serialize: SampleOriginResponseDto,
    openApi: {
      responses: [
        {
          type: SampleOriginResponseDto,
        },
      ],
    },
  },

  deleteById: <AppRouteOptions>{
    permissionAnyOf: [Permission.Admin],
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: SampleOriginResponseDto,
    openApi: {
      responses: [
        {
          type: SampleOriginResponseDto,
        },
      ],
    },
  },
}
