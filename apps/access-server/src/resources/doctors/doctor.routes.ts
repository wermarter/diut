import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions, AppRouteOptions } from 'src/core'
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
