import { ModuleMetadata } from '@nestjs/common'

import { AuthMeUseCase } from './use-case/me'
import { AuthLoginUseCase } from './use-case/login'
import { AuthPopulateContextUseCase } from './use-case/populate-context'
import { AuthGetContextInternalUseCase } from './use-case/get-context-internal'
import { AuthSetContextCacheUseCase } from './use-case/set-context-cache'

export const authMetadata: ModuleMetadata = {
  providers: [
    AuthMeUseCase,
    AuthLoginUseCase,
    AuthPopulateContextUseCase,
    AuthGetContextInternalUseCase,
    AuthSetContextCacheUseCase,
  ],
}
