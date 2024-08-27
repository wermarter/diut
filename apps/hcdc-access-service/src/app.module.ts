import { Module } from '@nestjs/common'

import { HttpModule } from './controller'

@Module({
  imports: [HttpModule],
})
export class AppModule {}
