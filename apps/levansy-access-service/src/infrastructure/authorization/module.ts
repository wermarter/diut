import { APP_INTERCEPTOR } from '@nestjs/core'
import { ModuleMetadata } from '@nestjs/common'

import { AuthorizationContextToken } from 'src/domain'
import { AuthorizationContext } from './context'
import { AuthorizationInterceptor } from './interceptor'

export const authorizationMetadata: ModuleMetadata = {
  providers: [
    {
      provide: AuthorizationContextToken,
      useClass: AuthorizationContext,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthorizationInterceptor,
    },
  ],
}
