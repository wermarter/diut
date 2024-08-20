import { Module } from '@nestjs/common'

import { HttpExternalModule } from './external'
import { HttpV1Module } from './v1'

@Module({
  imports: [HttpExternalModule, HttpV1Module],
})
export class HttpModule {}
