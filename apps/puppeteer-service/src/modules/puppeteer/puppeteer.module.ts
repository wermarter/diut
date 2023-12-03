import { Module } from '@nestjs/common'

import { PuppeteerService } from './puppeteer.service'
import { PuppeteerController } from './puppeteer.controller'

@Module({
  providers: [PuppeteerService],
  controllers: [PuppeteerController],
})
export class PuppeteerModule {}
