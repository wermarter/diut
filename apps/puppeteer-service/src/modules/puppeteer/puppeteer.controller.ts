import {
  HelloDto,
  HelloResponseDto,
  PuppeteerServiceController,
  PuppeteerServiceControllerMethods,
} from '@diut/nest-core'

import { PuppeteerService } from './puppeteer.service'

@PuppeteerServiceControllerMethods()
export class PuppeteerController implements PuppeteerServiceController {
  constructor(private readonly helloService: PuppeteerService) {}

  sayHello({ name }: HelloDto): HelloResponseDto {
    return { response: this.helloService.sayHello(name) }
  }
}
