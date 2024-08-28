import { ModuleMetadata } from '@nestjs/common'

import { AuthGetContextInternalUseCase } from './use-case/get-context-internal'
import { AuthLoginUseCase } from './use-case/login'
import { AuthMeUseCase } from './use-case/me'
import { AuthPopulateContextUseCase } from './use-case/populate-context'

export const authMetadata: ModuleMetadata = {
  providers: [
    AuthMeUseCase,
    AuthLoginUseCase,
    AuthPopulateContextUseCase,
    AuthGetContextInternalUseCase,
  ],
}
