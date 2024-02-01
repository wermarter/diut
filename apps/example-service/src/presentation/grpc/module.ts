import { ModuleMetadata } from '@nestjs/common'
import { ExampleServiceController } from './controller'

export const grpcMetadata: ModuleMetadata = {
  controllers: [ExampleServiceController],
}
