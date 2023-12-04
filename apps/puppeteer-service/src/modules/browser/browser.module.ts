import { Module } from '@nestjs/common'

import { BrowserService } from './browser.service'

@Module({
  imports: [],
  providers: [BrowserService],
  exports: [BrowserService],
})
export class BrowserModule {}
