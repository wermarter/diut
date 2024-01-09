import { ModuleMetadata } from '@nestjs/common'

import { BioProductController } from './bio-product/controller'
import { AuthController } from './auth/controller'

export const httpControllerV1Metadata: ModuleMetadata = {
  controllers: [BioProductController, AuthController],
  providers: [],
}
