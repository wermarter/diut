import { Permission } from '@diut/common'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions, AppRouteOptions } from 'src/core'
import { SearchPrintFormResponseDto } from './dtos/search-print-form.response-dto'
import { PrintFormResponseDto } from './dtos/print-form.response-dto'

export const printFormRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'print-forms',
  },

  search: <AppRouteOptions>{
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: SearchPrintFormResponseDto,
    openApi: {
      responses: [
        {
          type: SearchPrintFormResponseDto,
        },
      ],
    },
  },

  create: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
    method: RequestMethod.POST,
    serialize: PrintFormResponseDto,
    openApi: {
      responses: [
        {
          type: PrintFormResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: PrintFormResponseDto,
    openApi: {
      responses: [
        {
          type: PrintFormResponseDto,
        },
      ],
    },
  },

  findById: <AppRouteOptions>{
    path: ':id',
    method: RequestMethod.GET,
    serialize: PrintFormResponseDto,
    openApi: {
      responses: [
        {
          type: PrintFormResponseDto,
        },
      ],
    },
  },

  deleteById: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: PrintFormResponseDto,
    openApi: {
      responses: [
        {
          type: PrintFormResponseDto,
        },
      ],
    },
  },
}
