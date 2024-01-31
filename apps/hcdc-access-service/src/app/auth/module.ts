import { ModuleMetadata } from '@nestjs/common'

import { AuthMeUseCase } from './me'
import { AuthLoginUseCase } from './login'
import { AuthPopulateContextUseCase } from './populate-context'

export const authMetadata: ModuleMetadata = {
  providers: [AuthMeUseCase, AuthLoginUseCase, AuthPopulateContextUseCase],
}
