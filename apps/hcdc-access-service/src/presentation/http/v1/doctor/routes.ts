import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nest-core'

import { DoctorSearchResponseDto } from './dto/search.response-dto'
import { DoctorResponseDto } from './dto/response-dto'

export const doctorRoutes = {
  search: {
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: DoctorSearchResponseDto,
    openApi: {
      responses: [
        {
          type: DoctorSearchResponseDto,
        },
      ],
    },
  },

  create: {
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

  updateById: {
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

  findById: {
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

  deleteById: {
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
} satisfies Record<string, CustomHttpRouteOptions>
