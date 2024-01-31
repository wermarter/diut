import { Permission } from '@diut/hcdc'
import { RequestMethod } from '@nestjs/common'

import { AppControllerOptions } from '@diut/nestjs-infra'
import { AppRouteOptions } from 'src/common/route.decorator'

export const reportRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'reports',
  },

  exportSoiNhuom: <AppRouteOptions>{
    permissionAnyOf: [Permission.ExportSoiNhuom],
    path: 'export-soi-nhuom',
    method: RequestMethod.POST,
  },

  exportTraKQ: <AppRouteOptions>{
    permissionAnyOf: [Permission.ExportTraKQ],
    path: 'export-tra-kq',
    method: RequestMethod.POST,
  },

  exportGiaoNhanMau: <AppRouteOptions>{
    permissionAnyOf: [Permission.ExportGiaoNhanMau],
    path: 'export-giao-nhan-mau',
    method: RequestMethod.POST,
  },

  exportTD: <AppRouteOptions>{
    permissionAnyOf: [Permission.ExportTD],
    path: 'export-td',
    method: RequestMethod.POST,
  },

  exportHCG: <AppRouteOptions>{
    permissionAnyOf: [Permission.ExportHCG],
    path: 'export-hcg',
    method: RequestMethod.POST,
  },

  exportUrine10: <AppRouteOptions>{
    permissionAnyOf: [Permission.ExportUrine10],
    path: 'export-urine-10',
    method: RequestMethod.POST,
  },

  exportSinhHoa: <AppRouteOptions>{
    permissionAnyOf: [Permission.ExportSinhHoa],
    path: 'export-sinh-hoa',
    method: RequestMethod.POST,
  },

  exportPapsmear: <AppRouteOptions>{
    permissionAnyOf: [Permission.ExportPapSmear],
    path: 'export-papsmear',
    method: RequestMethod.POST,
  },

  exportThinprep: <AppRouteOptions>{
    permissionAnyOf: [Permission.ExportThinPrep],
    path: 'export-thinprep',
    method: RequestMethod.POST,
  },

  exportCTM: <AppRouteOptions>{
    permissionAnyOf: [Permission.ExportCTM],
    path: 'export-ctm',
    method: RequestMethod.POST,
  },

  exportHIV: <AppRouteOptions>{
    permissionAnyOf: [Permission.ExportHIV],
    path: 'export-hiv',
    method: RequestMethod.POST,
  },
}
