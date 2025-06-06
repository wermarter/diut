import { CustomHttpRouteOptions } from '@diut/nestjs-infra'
import { HttpStatus, RequestMethod } from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'
import { SampleCreateResponseDto } from './dto/create'
import { SampleGetPrintPathResponseDto } from './dto/get-print-path'
import {
  SampleResponseDto,
  SampleUnpopulatedResponseDto,
} from './dto/response-dto'
import { SampleSearchResponseDto } from './dto/search'
import { SampleUpdateInfoResponseDto } from './dto/update-info'
import { SampleUpdateResultResponseDto } from './dto/update-result'
import { SampleUploadImageResponseDto } from './dto/upload-image'

export const sampleRoutes = {
  search: {
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: SampleSearchResponseDto,
    openApi: {
      responses: [
        {
          type: SampleSearchResponseDto,
        },
      ],
    },
  },

  create: {
    method: RequestMethod.POST,
    serialize: SampleCreateResponseDto,
    openApi: {
      responses: [
        {
          type: SampleCreateResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  print: {
    path: 'print',
    method: RequestMethod.POST,
  },

  printReminder: {
    path: ':id/print-reminder',
    method: RequestMethod.GET,
    routeDecorators: [
      ApiQuery({ name: 'timestamp', required: true, type: 'number' }),
    ],
  },

  lock: {
    path: ':id/lock',
    method: RequestMethod.POST,
  },

  unlock: {
    path: ':id/unlock',
    method: RequestMethod.POST,
  },

  getPrintPath: {
    path: 'get-print-path',
    method: RequestMethod.POST,
    serialize: SampleGetPrintPathResponseDto,
    openApi: {
      responses: [
        {
          type: SampleGetPrintPathResponseDto,
        },
      ],
    },
  },

  uploadResultImage: {
    path: 'upload',
    method: RequestMethod.POST,
    serialize: SampleUploadImageResponseDto,
    openApi: {
      responses: [
        {
          type: SampleUploadImageResponseDto,
        },
      ],
    },
  },

  downloadResultImage: {
    path: 'download',
    method: RequestMethod.GET,
  },

  updateInfoById: {
    path: ':id/info',
    method: RequestMethod.PATCH,
    serialize: SampleUpdateInfoResponseDto,
    openApi: {
      responses: [
        {
          type: SampleUpdateInfoResponseDto,
        },
      ],
    },
  },

  updateResultById: {
    path: ':id/result',
    method: RequestMethod.PATCH,
    serialize: SampleUpdateResultResponseDto,
    openApi: {
      responses: [
        {
          type: SampleUpdateResultResponseDto,
        },
      ],
    },
  },

  findInfoById: {
    path: ':id/info',
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

  findById: {
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

  deleteById: {
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: SampleUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: SampleUnpopulatedResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
