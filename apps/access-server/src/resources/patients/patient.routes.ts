import { Permission } from '@diut/common'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions, AppRouteOptions } from 'src/core'
import { SearchPatientResponseDto } from './dtos/search-patient.response-dto'
import { PatientResponseDto } from './dtos/patient.response-dto'

export const patientRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'patients',
  },

  search: <AppRouteOptions>{
    permissionAnyOf: [Permission.ManageResult, Permission.ManageInfo],
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: SearchPatientResponseDto,
    openApi: {
      responses: [
        {
          type: SearchPatientResponseDto,
        },
      ],
    },
  },

  create: <AppRouteOptions>{
    permissionAnyOf: [Permission.ManageInfo],
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

  updateById: <AppRouteOptions>{
    permissionAnyOf: [Permission.ManageInfo],
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

  findById: <AppRouteOptions>{
    permissionAnyOf: [Permission.ManageInfo, Permission.ManageResult],
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

  deleteById: <AppRouteOptions>{
    permissionAnyOf: [Permission.Admin],
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
}
