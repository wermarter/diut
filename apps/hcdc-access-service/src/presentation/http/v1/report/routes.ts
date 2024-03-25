import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nestjs-infra'

import { ReportSoNhanMauResponseDto } from './dto/so-nhan-mau.dto'

export const reportRoutes = {
  exportSoNhanMau: {
    path: 'so-nhan-mau',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    serialize: ReportSoNhanMauResponseDto,
    openApi: {
      responses: [
        {
          type: ReportSoNhanMauResponseDto,
        },
      ],
    },
  },
} satisfies Record<string, CustomHttpRouteOptions>
