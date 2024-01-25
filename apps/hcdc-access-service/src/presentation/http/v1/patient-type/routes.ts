import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nest-core'

import { PatientTypeSearchResponseDto } from './dto/search.response-dto'
import { PatientTypeResponseDto } from './dto/response-dto'

export const patientTypeRoutes = {
  search: {
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: PatientTypeSearchResponseDto,
    openApi: {
      responses: [
        {
          type: PatientTypeSearchResponseDto,
        },
      ],
    },
  },

  create: {
    method: RequestMethod.POST,
    serialize: PatientTypeResponseDto,
    openApi: {
      responses: [
        {
          type: PatientTypeResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: PatientTypeResponseDto,
    openApi: {
      responses: [
        {
          type: PatientTypeResponseDto,
        },
      ],
    },
  },

  findById: {
    path: ':id',
    method: RequestMethod.GET,
    serialize: PatientTypeResponseDto,
    openApi: {
      responses: [
        {
          type: PatientTypeResponseDto,
        },
      ],
    },
  },

  deleteById: {
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: PatientTypeResponseDto,
    openApi: {
      responses: [
        {
          type: PatientTypeResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
