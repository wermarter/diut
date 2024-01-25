import { ModuleMetadata } from '@nestjs/common'

import { BioProductController } from './bio-product/controller'
import { AuthController } from './auth/controller'
import { RoleController } from './role/controller'
import { BranchController } from './branch/controller'
import { UserController } from './user/controller'
import { TestCategoryController } from './test-category/controller'

export const httpControllerV1Metadata: ModuleMetadata = {
  controllers: [
    BioProductController,
    AuthController,
    RoleController,
    BranchController,
    UserController,
    TestCategoryController,
  ],
  providers: [],
}
