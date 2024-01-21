import { ModuleMetadata } from '@nestjs/common'

import { BioProductController } from './bio-product/controller'
import { AuthController } from './auth/controller'
import { RoleController } from './role/controller'
import { BranchController } from './branch/controller'

export const httpControllerV1Metadata: ModuleMetadata = {
  controllers: [
    BioProductController,
    AuthController,
    RoleController,
    BranchController,
  ],
  providers: [],
}
