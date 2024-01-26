import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nest-core'

import { DiagnosisSearchResponseDto } from './dto/search.response-dto'
import {
  DiagnosisResponseDto,
  DiagnosisUnpopulatedResponseDto,
} from './dto/response-dto'

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
    serialize: DiagnosisUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: DiagnosisUnpopulatedResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: DiagnosisUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: DiagnosisUnpopulatedResponseDto,
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
    serialize: DiagnosisUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: DiagnosisUnpopulatedResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
