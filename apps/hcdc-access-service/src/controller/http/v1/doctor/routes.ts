import { CustomHttpRouteOptions } from '@diut/nestjs-infra'
import { HttpStatus, RequestMethod } from '@nestjs/common'
import {
  DoctorResponseDto,
  DoctorUnpopulatedResponseDto,
} from './dto/response-dto'
import { DoctorSearchResponseDto } from './dto/search'

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
    serialize: DoctorUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: DoctorUnpopulatedResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: DoctorUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: DoctorUnpopulatedResponseDto,
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
    serialize: DoctorUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: DoctorUnpopulatedResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
