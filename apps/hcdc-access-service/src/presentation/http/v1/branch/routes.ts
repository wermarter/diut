import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nest-core'

import { BranchSearchResponseDto } from './dto/search.response-dto'
import { BranchResponseDto } from './dto/response-dto'

export const branchRoutes: Record<string, CustomHttpRouteOptions> = {
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
    serialize: BranchResponseDto,
    openApi: {
      responses: [
        {
          type: BranchResponseDto,
          status: HttpStatus.CREATED,
        },
      ],
    },
  },

  updateById: {
    path: ':id',
    method: RequestMethod.PATCH,
    serialize: BranchResponseDto,
    openApi: {
      responses: [
        {
          type: BranchResponseDto,
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
    serialize: BranchResponseDto,
    openApi: {
      responses: [
        {
          type: BranchResponseDto,
        },
      ],
    },
  },
}
