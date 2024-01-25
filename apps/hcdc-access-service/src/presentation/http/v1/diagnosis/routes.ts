import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nest-core'

import { DiagnosisSearchResponseDto } from './dto/search.response-dto'
import { DiagnosisResponseDto } from './dto/response-dto'

export const diagnosisRoutes = {
  search: {
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: DiagnosisSearchResponseDto,
    openApi: {
      responses: [
        {
          type: DiagnosisSearchResponseDto,
        },
      ],
    },
  },

  create: {
    method: RequestMethod.POST,
    serialize: DiagnosisResponseDto,
    openApi: {
      responses: [
        {
          type: DiagnosisResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: DiagnosisResponseDto,
    openApi: {
      responses: [
        {
          type: DiagnosisResponseDto,
        },
      ],
    },
  },

  findById: {
    path: ':id',
    method: RequestMethod.GET,
    serialize: DiagnosisResponseDto,
    openApi: {
      responses: [
        {
          type: DiagnosisResponseDto,
        },
      ],
    },
  },

  deleteById: {
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: DiagnosisResponseDto,
    openApi: {
      responses: [
        {
          type: DiagnosisResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
