import { Module } from '@nestjs/common'
import { ConfigModule } from '@diut/nestjs-core'

import { BrowserService } from './browser.service'
import { loadAppConfig } from 'src/configs'

@Module({
  imports: [ConfigModule.forFeature(loadAppConfig)],
  providers: [BrowserService],
  exports: [BrowserService],
})
export class BrowserModule {}
