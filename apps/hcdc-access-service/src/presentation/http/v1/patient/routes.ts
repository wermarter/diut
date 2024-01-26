import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nest-core'

import { PatientSearchResponseDto } from './dto/search.response-dto'
import { PatientResponseDto } from './dto/response-dto'

export const patientRoutes = {
  search: {
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: PatientSearchResponseDto,
    openApi: {
      responses: [
        {
          type: PatientSearchResponseDto,
        },
      ],
    },
  },

  create: {
    method: RequestMethod.POST,
    serialize: PatientResponseDto,
    openApi: {
      responses: [
        {
          type: PatientResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: PatientResponseDto,
    openApi: {
      responses: [
        {
          type: PatientResponseDto,
        },
      ],
    },
  },

  findById: {
    path: ':id',
    method: RequestMethod.GET,
    serialize: PatientResponseDto,
    openApi: {
      responses: [
        {
          type: PatientResponseDto,
        },
      ],
    },
  },

  deleteById: {
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: PatientResponseDto,
    openApi: {
      responses: [
        {
          type: PatientResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
