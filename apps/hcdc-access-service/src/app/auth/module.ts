import { ModuleMetadata } from '@nestjs/common'

import { AuthMeUseCase } from './use-case/me'
import { AuthLoginUseCase } from './use-case/login'
import { AuthPopulateContextUseCase } from './use-case/populate-context'
import { AuthGetContextUseCase } from './use-case/get-context'
import { AuthSetContextCacheUseCase } from './use-case/set-context-cache'

export const authMetadata: ModuleMetadata = {
  providers: [
    AuthMeUseCase,
    AuthLoginUseCase,
    AuthPopulateContextUseCase,
    AuthGetContextUseCase,
    AuthSetContextCacheUseCase,
  ],
}
