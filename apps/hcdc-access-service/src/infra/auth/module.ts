import { ModuleMetadata } from '@nestjs/common'
import { ClsModule } from 'nestjs-cls'

import { AuthContextToken } from 'src/domain'
import { AuthContext } from './context'

export const authMetadata: ModuleMetadata = {
  imports: [
    ClsModule.forRoot({
      guard: { mount: true },
    }),
  ],
  providers: [
    {
      provide: AuthContextToken,
      useClass: AuthContext,
    },
  ],
}
