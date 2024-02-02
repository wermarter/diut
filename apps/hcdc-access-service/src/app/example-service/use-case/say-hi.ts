import { Inject, Injectable } from '@nestjs/common'
import { lastValueFrom } from 'rxjs'

import { AppConfig, loadAppConfig } from 'src/config'
import { ExampleServiceToken, IExampleService } from 'src/domain'

@Injectable()
export class ExampleServiceSayHiUsecase {
  constructor(
    @Inject(loadAppConfig.KEY) private readonly appConfig: AppConfig,
    @Inject(ExampleServiceToken)
    private readonly exampleService: IExampleService,
  ) {}

  async execute(input: { myNameIs?: string }) {
    const reply$ = this.exampleService.sayHello({
      myNameIs: input.myNameIs ?? this.appConfig.SERVICE_NAME,
    })

    const { response } = await lastValueFrom(reply$)
    return response
  }
}
