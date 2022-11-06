import { Permission } from '@diut/common'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions, AppRouteOptions } from 'src/core'
import { SearchSampleResponseDto } from './dtos/search-sample.response-dto'
import { SampleResponseDto } from './dtos/sample.response-dto'

export const sampleRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'samples',
  },

  search: <AppRouteOptions>{
    permissions: [Permission.ManageInfo, Permission.ManageResult],
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: SearchSampleResponseDto,
    openApi: {
      responses: [
        {
          type: SearchSampleResponseDto,
        },
      ],
    },
  },

  create: <AppRouteOptions>{
    permissions: [Permission.ManageInfo],
    method: RequestMethod.POST,
    serialize: SampleResponseDto,
    openApi: {
      responses: [
        {
          type: SampleResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: <AppRouteOptions>{
    permissions: [Permission.ManageInfo, Permission.ManageResult],
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: SampleResponseDto,
    openApi: {
      responses: [
        {
          type: SampleResponseDto,
        },
      ],
    },
  },

  findById: <AppRouteOptions>{
    permissions: [Permission.ManageInfo, Permission.ManageResult],
    path: ':id',
    method: RequestMethod.GET,
    serialize: SampleResponseDto,
    openApi: {
      responses: [
        {
          type: SampleResponseDto,
        },
      ],
    },
  },

  deleteById: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: SampleResponseDto,
    openApi: {
      responses: [
        {
          type: SampleResponseDto,
        },
      ],
    },
  },

  printById: <AppRouteOptions>{
    permissions: [Permission.ManageResult],
    path: 'print/:id',
    method: RequestMethod.GET,
  },
}
