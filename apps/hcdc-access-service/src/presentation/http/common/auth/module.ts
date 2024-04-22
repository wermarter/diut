import { ModuleMetadata } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { HttpAuthService } from './service'

export const authMetadata: ModuleMetadata = {
  imports: [JwtModule.register({})],
  providers: [HttpAuthService],
}
