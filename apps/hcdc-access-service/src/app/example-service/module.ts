import { ModuleMetadata } from '@nestjs/common'

import { ExampleServiceSayHiUsecase } from './say-hi.use-case'

export const exampleServiceMetadata: ModuleMetadata = {
  providers: [ExampleServiceSayHiUsecase],
}
