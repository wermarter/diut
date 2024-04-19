import { ModuleMetadata } from '@nestjs/common'

import { CachePrimaryModule } from './primary'
import { CacheSecondaryModule } from './secondary'

export const redisMetadata: ModuleMetadata = {
  imports: [CachePrimaryModule, CacheSecondaryModule],
}
