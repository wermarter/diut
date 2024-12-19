import { CustomHttpRouteOptions } from '@diut/nestjs-infra'
import { HttpStatus, RequestMethod } from '@nestjs/common'
import { ReportQuerySoNhanMauResponseDto } from './dto/query-so-nhan-mau'

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
  exportThinprep: {
    path: 'thinprep/export',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
  },
  exportHIV: {
    path: 'hiv/export',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
  },
  exportCTM: {
    path: 'ctm/export',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
  },
  exportTraKQ: {
    path: 'tra-kq/export',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
  },
  exportGiaoNhan: {
    path: 'giao-nhan/export',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
  },
} satisfies Record<string, CustomHttpRouteOptions>
