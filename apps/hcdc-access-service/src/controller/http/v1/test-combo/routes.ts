import { CustomHttpRouteOptions } from '@diut/nestjs-infra'
import { HttpStatus, RequestMethod } from '@nestjs/common'
import {
  TestComboResponseDto,
  TestComboUnpopulatedResponseDto,
} from './dto/response-dto'
import { TestComboSearchResponseDto } from './dto/search'

export const testComboRoutes = {
  search: {
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: TestComboSearchResponseDto,
    openApi: {
      responses: [
        {
          type: TestComboSearchResponseDto,
        },
      ],
    },
  },

  create: {
    method: RequestMethod.POST,
    serialize: TestComboUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: TestComboUnpopulatedResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: TestComboUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: TestComboUnpopulatedResponseDto,
        },
      ],
    },
  },

  findById: {
    path: ':id',
    method: RequestMethod.GET,
    serialize: TestComboResponseDto,
    openApi: {
      responses: [
        {
          type: TestComboResponseDto,
        },
      ],
    },
  },

  deleteById: {
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: TestComboUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: TestComboUnpopulatedResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
