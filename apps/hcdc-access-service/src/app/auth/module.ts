import { ModuleMetadata } from '@nestjs/common'

import { AuthMeUseCase } from './use-case/me'
import { AuthLoginUseCase } from './use-case/login'
import { AuthPopulateContextUseCase } from './use-case/populate-context'

export const authMetadata: ModuleMetadata = {
  providers: [AuthMeUseCase, AuthLoginUseCase, AuthPopulateContextUseCase],
}