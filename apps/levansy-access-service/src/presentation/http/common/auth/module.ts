import { ModuleMetadata } from '@nestjs/common'

import { JwtStrategy } from './jwt'

export const authMetadata: ModuleMetadata = {
  providers: [JwtStrategy],
}
