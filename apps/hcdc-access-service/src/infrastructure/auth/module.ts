import { ModuleMetadata } from '@nestjs/common'

import { AuthContextToken } from 'src/domain'
import { AuthContext } from './context'

export const authMetadata: ModuleMetadata = {
  providers: [
    {
      provide: AuthContextToken,
      useClass: AuthContext,
    },
  ],
}
