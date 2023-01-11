import { Permission } from '@diut/common'
import { RequestMethod } from '@nestjs/common'

import { AppControllerOptions, AppRouteOptions } from 'src/core'

export const appSettingRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'app-settings',
  },

  setSetting: <AppRouteOptions>{
    path: 'set',
    permissionAnyOf: [Permission.Admin],
    method: RequestMethod.POST,
  },

  getSetting: <AppRouteOptions>{
    path: 'get',
    permissionAnyOf: [Permission.Admin, Permission.ManageResult],
    method: RequestMethod.POST,
  },

  deleteSetting: <AppRouteOptions>{
    permissionAnyOf: [Permission.Admin],
    method: RequestMethod.DELETE,
  },
}
