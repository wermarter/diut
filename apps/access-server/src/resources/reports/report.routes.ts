import { Permission } from '@diut/common'
import { RequestMethod } from '@nestjs/common'

import { AppControllerOptions, AppRouteOptions } from 'src/core'

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
    permissionAnyOf: [Permission.ExportTraKQ, Permission.ExportGiaoNhanMau],
    path: 'export-tra-kq',
    method: RequestMethod.POST,
  },
}
