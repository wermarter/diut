import { Module } from '@nestjs/common'
import { ConfigModule } from '@diut/nestjs-infra'

import { BrowserService } from './browser.service'
import { loadAppConfig } from 'src/config'

@Module({
  imports: [ConfigModule.forFeature(loadAppConfig)],
  providers: [BrowserService],
  exports: [BrowserService],
})
export class BrowserModule {}
