import { CustomHttpRouteOptions } from '@diut/nestjs-infra'
import { HttpStatus, RequestMethod } from '@nestjs/common'
import {
  TestElementResponseDto,
  TestElementUnpopulatedResponseDto,
} from './dto/response-dto'
import { TestElementSearchResponseDto } from './dto/search'

export const testElementRoutes = {
  search: {
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: TestElementSearchResponseDto,
    openApi: {
      responses: [
        {
          type: TestElementSearchResponseDto,
        },
      ],
    },
  },

  create: {
    method: RequestMethod.POST,
    serialize: TestElementUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: TestElementUnpopulatedResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: TestElementUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: TestElementUnpopulatedResponseDto,
        },
      ],
    },
  },

  findById: {
    path: ':id',
    method: RequestMethod.GET,
    serialize: TestElementResponseDto,
    openApi: {
      responses: [
        {
          type: TestElementResponseDto,
        },
      ],
    },
  },

  deleteById: {
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: TestElementUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: TestElementUnpopulatedResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
