import { CustomHttpRouteOptions } from '@diut/nestjs-infra'
import { HttpStatus, RequestMethod } from '@nestjs/common'
import {
  PatientTypeResponseDto,
  PatientTypeUnpopulatedResponseDto,
} from './dto/response-dto'
import { PatientTypeSearchResponseDto } from './dto/search'

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
    serialize: PatientTypeUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: PatientTypeUnpopulatedResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: PatientTypeUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: PatientTypeUnpopulatedResponseDto,
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
    serialize: PatientTypeUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: PatientTypeUnpopulatedResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
