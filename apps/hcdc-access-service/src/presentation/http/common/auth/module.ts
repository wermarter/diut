import { ModuleMetadata } from '@nestjs/common'

import { HttpJwtStrategy } from './jwt'
import { AuthCookieService } from './cookie.service'

export const authMetadata: ModuleMetadata = {
  providers: [HttpJwtStrategy, AuthCookieService],
}
