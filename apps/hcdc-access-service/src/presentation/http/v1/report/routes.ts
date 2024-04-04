import { HttpStatus, RequestMethod } from '@nestjs/common'
import { CustomHttpRouteOptions } from '@diut/nestjs-infra'

import { ReportQuerySoNhanMauResponseDto } from './dto/query-so-nhan-mau.dto'

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
  exportSoNhanMau: {
    path: 'so-nhan-mau/export',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
  },
  exportSinhHoa: {
    path: 'sinh-hoa/export',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
  },
  exportSoiNhuom: {
    path: 'soi-nhuom/export',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
  },
  exportTDD: {
    path: 'tdd/export',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
  },
  exportUrine: {
    path: 'urine/export',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
  },
  exportHCG: {
    path: 'hcg/export',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
  },
  exportPap: {
    path: 'pap/export',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
  },
} satisfies Record<string, CustomHttpRouteOptions>
