import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nestjs-infra'

import { ReportQuerySoNhanMauResponseDto } from './dto/so-nhan-mau.dto'

export const reportRoutes = {
  querySoNhanMau: {
    path: 'so-nhan-mau',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: ReportQuerySoNhanMauResponseDto,
    openApi: {
      responses: [
        {
          type: ReportQuerySoNhanMauResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
