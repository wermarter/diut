import { ModuleMetadata } from '@nestjs/common'
import { ClsModule } from 'nestjs-cls'

import { AUTH_CONTEXT_TOKEN } from 'src/domain'
import { AuthContext } from './context'

export const authMetadata: ModuleMetadata = {
  imports: [
    ClsModule.forRoot({
      guard: { mount: true },
    }),
  ],
  providers: [
    {
      provide: AUTH_CONTEXT_TOKEN,
      useClass: AuthContext,
    },
  ],
}
