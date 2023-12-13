import { ModuleMetadata } from '@nestjs/common'

import { BioProductController } from './bio-product/controller'
import { TestCategoryController } from './test-category/controller'

export const httpControllerV1Metadata: ModuleMetadata = {
  controllers: [BioProductController, TestCategoryController],
}
