import { HttpStatus, RequestMethod } from '@nestjs/common'

import { AppControllerOptions, AppRouteOptions } from 'src/core'
import { CreateBookResponseDto } from './dtos'

export const bookRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'books',
  },

  createBook: <AppRouteOptions>{
    method: RequestMethod.POST,
    openApi: {
      responses: [{ type: CreateBookResponseDto, status: HttpStatus.CREATED }],
    },
    serialize: CreateBookResponseDto,
  },
}
