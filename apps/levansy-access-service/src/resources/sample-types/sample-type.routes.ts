import { Permission } from '@diut/levansy-common'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions } from '@diut/nest-core'
import { AppRouteOptions } from 'src/common/route.decorator'
import { SearchSampleTypeResponseDto } from './dtos/search-sample-type.response-dto'
import { SampleTypeResponseDto } from './dtos/sample-type.response-dto'

export const sampleTypeRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'sample-types',
  },

  search: <AppRouteOptions>{
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: SearchSampleTypeResponseDto,
    openApi: {
      responses: [
        {
          type: SearchSampleTypeResponseDto,
        },
      ],
    },
  },

  create: <AppRouteOptions>{
    permissionAnyOf: [Permission.Admin],
    method: RequestMethod.POST,
    serialize: SampleTypeResponseDto,
    openApi: {
      responses: [
        {
          type: SampleTypeResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: <AppRouteOptions>{
    permissionAnyOf: [Permission.Admin],
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: SampleTypeResponseDto,
    openApi: {
      responses: [
        {
          type: SampleTypeResponseDto,
        },
      ],
    },
  },

  findById: <AppRouteOptions>{
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

  deleteById: <AppRouteOptions>{
    permissionAnyOf: [Permission.Admin],
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: SampleTypeResponseDto,
    openApi: {
      responses: [
        {
          type: SampleTypeResponseDto,
        },
      ],
    },
  },
}
