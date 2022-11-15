import { Permission } from '@diut/common'
import { RequestMethod } from '@nestjs/common'

import { AppControllerOptions, AppRouteOptions } from 'src/core'

export const appSettingRoutes = {
  controller: <AppControllerOptions>{
    basePath: 'app-settings',
  },

  setSetting: <AppRouteOptions>{
    path: 'set',
    permissions: [Permission.ManageCore],
    method: RequestMethod.POST,
  },

  getSetting: <AppRouteOptions>{
    path: 'get',
    permissions: [Permission.ManageCore, Permission.ManageResult],
    method: RequestMethod.POST,
  },

  deleteSetting: <AppRouteOptions>{
    permissions: [Permission.ManageCore],
    method: RequestMethod.DELETE,
  },
}
