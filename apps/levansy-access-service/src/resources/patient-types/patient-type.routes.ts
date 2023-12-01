import { Permission } from '@diut/levansy-common'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions } from '@diut/nest-core'
import { AppRouteOptions } from 'src/common/route.decorator'
import { SearchPatientTypeResponseDto } from './dtos/search-patient-type.response-dto'
import { PatientTypeResponseDto } from './dtos/patient-type.response-dto'

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
    permissionAnyOf: [Permission.Admin],
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
    permissionAnyOf: [Permission.Admin],
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
    permissionAnyOf: [Permission.Admin],
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
