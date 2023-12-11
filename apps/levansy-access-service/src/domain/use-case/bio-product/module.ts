import { ModuleMetadata } from '@nestjs/common'

import { BioProductCreateUseCase } from './create'
import { BioProductHelloUseCase } from './hello'

export const bioProductUseCaseMetadata: ModuleMetadata = {
  providers: [BioProductCreateUseCase, BioProductHelloUseCase],
}
