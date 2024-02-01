import { Inject, Injectable } from '@nestjs/common'

import { AppConfig, loadAppConfig } from 'src/config'

@Injectable()
export class ExampleService {
  constructor(
    @Inject(loadAppConfig.KEY) private readonly appConfig: AppConfig,
  ) {}

  sayHello(name: string) {
    return `Hello ${name}, I am ${this.appConfig.SERVICE_NAME}!`
  }
}
