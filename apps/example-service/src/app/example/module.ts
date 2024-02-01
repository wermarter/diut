import { ModuleMetadata } from '@nestjs/common'

import { ExampleService } from './service'

export const exampleMetadata: ModuleMetadata = {
  providers: [ExampleService],
}
