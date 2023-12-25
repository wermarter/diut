import { ModuleMetadata } from '@nestjs/common'

import { AuthzContextToken } from 'src/domain'
import { AuthzContext } from './context'

export const authorizationMetadata: ModuleMetadata = {
  providers: [
    {
      provide: AuthzContextToken,
      useClass: AuthzContext,
    },
  ],
}
