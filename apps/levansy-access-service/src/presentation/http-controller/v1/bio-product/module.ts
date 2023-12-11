import { ModuleMetadata } from '@nestjs/common'

import { BioProductController } from './controller'

export const v1BioProductMetadata: ModuleMetadata = {
  controllers: [BioProductController],
}
