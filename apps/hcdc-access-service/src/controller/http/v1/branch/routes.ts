import { CustomHttpRouteOptions } from '@diut/nestjs-infra'
import { HttpStatus, RequestMethod } from '@nestjs/common'

import {
  BranchResponseDto,
  BranchUnpopulatedResponseDto,
} from './dto/response-dto'
import { BranchSearchResponseDto } from './dto/search'

export const branchRoutes = {
  search: {
    path: 'search',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: BranchSearchResponseDto,
    openApi: {
      responses: [
        {
          type: BranchSearchResponseDto,
        },
      ],
    },
  },

  create: {
    method: RequestMethod.POST,
    serialize: BranchUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: BranchUnpopulatedResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: BranchUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: BranchUnpopulatedResponseDto,
        },
      ],
    },
  },

  findById: {
    path: ':id',
    method: RequestMethod.GET,
    serialize: BranchResponseDto,
    openApi: {
      responses: [
        {
          type: BranchResponseDto,
        },
      ],
    },
  },

  deleteById: {
    path: ':id',
    method: RequestMethod.DELETE,
    serialize: BranchUnpopulatedResponseDto,
    openApi: {
      responses: [
        {
          type: BranchUnpopulatedResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
