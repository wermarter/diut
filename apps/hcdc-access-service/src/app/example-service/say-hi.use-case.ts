import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { lastValueFrom } from 'rxjs'

import { AppConfig, loadAppConfig } from 'src/config'
import { ExampleServiceToken, IExampleService } from 'src/domain'

@Injectable()
export class ExampleServiceSayHiUsecase implements OnModuleInit {
  private readonly logger = new Logger(ExampleServiceSayHiUsecase.name)

  constructor(
    @Inject(loadAppConfig.KEY) private readonly appConfig: AppConfig,
    @Inject(ExampleServiceToken)
    private readonly exampleService: IExampleService,
  ) {}

  async onModuleInit() {
    const reply$ = this.exampleService.sayHello({
      myNameIs: this.appConfig.SERVICE_NAME,
    })

    const { response } = await lastValueFrom(reply$)
    this.logger.verbose(response)
  }
}
