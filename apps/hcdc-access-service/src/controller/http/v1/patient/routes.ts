import { CustomHttpRouteOptions } from '@diut/nestjs-infra'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import {
  PatientResponseDto,
  PatientUnpopulatedResponseDto,
} from './dto/response-dto'
import { PatientSearchResponseDto } from './dto/search'

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
    serialize: PatientUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: PatientUnpopulatedResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: PatientUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: PatientUnpopulatedResponseDto,
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
    serialize: PatientUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: PatientUnpopulatedResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
