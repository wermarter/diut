import { ModuleMetadata } from '@nestjs/common'

import { BioProductController } from './bio-product/controller'

export const httpControllerV1Metadata: ModuleMetadata = {
  controllers: [BioProductController],
}
