import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nestjs-infra'

import { PatientSearchResponseDto } from './dto/search'
import {
  PatientResponseDto,
  PatientUnpopulatedResponseDto,
} from './dto/response-dto'

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
