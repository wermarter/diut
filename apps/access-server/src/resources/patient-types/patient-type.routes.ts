import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions, AppRouteOptions } from 'src/core'
import { SearchPatientTypeResponseDto } from './dtos/search-patient-type.response.dto'
import { PatientTypeResponseDto } from './dtos/patient-type.response.dto'

export const patientTypeRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'patient-types',
  },

  search: <AppRouteOptions>{
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: SearchPatientTypeResponseDto,
    openApi: {
      responses: [
        {
          type: SearchPatientTypeResponseDto,
        },
      ],
    },
  },

  create: <AppRouteOptions>{
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

  updateById: <AppRouteOptions>{
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

  findById: <AppRouteOptions>{
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

  deleteById: <AppRouteOptions>{
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
}
