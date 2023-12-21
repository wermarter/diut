import { ModuleMetadata } from '@nestjs/common'

import { BioProductController } from './bio-product/controller'
import { TestCategoryController } from './test-category/controller'
import { AuthController } from './auth/controller'

export const httpControllerV1Metadata: ModuleMetadata = {
  controllers: [BioProductController, TestCategoryController, AuthController],
  providers: [],
}
