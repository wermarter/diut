import { ModuleMetadata } from '@nestjs/common'
import { BrowserServiceController } from './controller'

export const grpcMetadata: ModuleMetadata = {
  controllers: [BrowserServiceController],
}
