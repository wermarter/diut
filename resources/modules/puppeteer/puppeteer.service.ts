import { Injectable } from '@nestjs/common'

@Injectable()
export class PuppeteerService {
  sayHello(name: string) {
    return `Hello, ${name}!`
  }
}
