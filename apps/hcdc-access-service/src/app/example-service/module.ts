import { ModuleMetadata } from '@nestjs/common'

import { ExampleServiceSayHiUsecase } from './use-case/say-hi'

export const exampleServiceMetadata: ModuleMetadata = {
  providers: [ExampleServiceSayHiUsecase],
}
