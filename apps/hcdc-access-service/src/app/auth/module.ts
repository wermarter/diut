import { ModuleMetadata } from '@nestjs/common'

import { AuthMeUseCase } from './use-case/me'
import { AuthLoginUseCase } from './use-case/login'
import { AuthPopulateContextUseCase } from './use-case/populate-context'
import { AuthGetContextInternalUseCase } from './use-case/get-context-internal'

export const authMetadata: ModuleMetadata = {
  providers: [
    AuthMeUseCase,
    AuthLoginUseCase,
    AuthPopulateContextUseCase,
    AuthGetContextInternalUseCase,
  ],
}
