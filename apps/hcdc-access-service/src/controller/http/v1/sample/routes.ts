import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nestjs-infra'

import { SampleSearchResponseDto } from './dto/search.dto'
import {
  SampleResponseDto,
  SampleUnpopulatedResponseDto,
} from './dto/response-dto'
import { SampleUpdateInfoResponseDto } from './dto/update-info.dto'
import { SampleUpdateResultResponseDto } from './dto/update-result.dto'
import { SampleCreateResponseDto } from './dto/create.dto'
import { SampleUploadImageResponseDto } from './dto/upload-image.dto'

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
