import { Module } from '@nestjs/common'

import { HttpModule } from './presentation'

@Module({
  imports: [HttpModule],
})
export class AppModule {}
