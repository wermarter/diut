import { RequestMethod } from '@nestjs/common'

import { AppControllerOptions, AppRouteOptions } from 'src/core'

export const reportRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'reports',
  },

  exportSoiNhuom: <AppRouteOptions>{
    isPublic: true,
    path: 'export-soi-nhuom',
    method: RequestMethod.POST,
  },
}
