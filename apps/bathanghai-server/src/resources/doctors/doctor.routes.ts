import { Permission } from '@diut/common'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions } from '@diut/server-core'
import { AppRouteOptions } from 'src/common/route.decorator'
import { SearchDoctorResponseDto } from './dtos/search-doctor.response-dto'
import { DoctorResponseDto } from './dtos/doctor.response-dto'

export const doctorRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'doctors',
  },

  search: <AppRouteOptions>{
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: SearchDoctorResponseDto,
    openApi: {
      responses: [
        {
          type: SearchDoctorResponseDto,
        },
      ],
    },
  },

  create: <AppRouteOptions>{
    permissionAnyOf: [Permission.Admin],
    method: RequestMethod.POST,
    serialize: DoctorResponseDto,
    openApi: {
      responses: [
        {
          type: DoctorResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: <AppRouteOptions>{
    permissionAnyOf: [Permission.Admin],
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: DoctorResponseDto,
    openApi: {
      responses: [
        {
          type: DoctorResponseDto,
        },
      ],
    },
  },

  findById: <AppRouteOptions>{
    path: ':id',
    method: RequestMethod.GET,
    serialize: DoctorResponseDto,
    openApi: {
      responses: [
        {
          type: DoctorResponseDto,
        },
      ],
    },
  },

  deleteById: <AppRouteOptions>{
    permissionAnyOf: [Permission.Admin],
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: DoctorResponseDto,
    openApi: {
      responses: [
        {
          type: DoctorResponseDto,
        },
      ],
    },
  },
}
