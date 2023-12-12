import { Permission } from '@diut/levansy-common'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions } from '@diut/nest-core'
import { AppRouteOptions } from 'src/common/route.decorator'
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
    permissionAnyOf: [Permission.Admin],
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
    permissionAnyOf: [Permission.Admin],
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
    permissionAnyOf: [Permission.Admin],
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
