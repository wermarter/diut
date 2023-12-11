import { Inject, Injectable, Logger } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

import {
  AppConfigToken,
  BioProductRepositoryToken,
  IAppConfig,
  IBioProductRepository,
  IPuppeteerService,
  PuppeteerServiceToken,
} from 'src/domain/interface'
import { IUseCase } from '../interface'

export type BioProductHelloUseCaseInput = void
export type BioProductHelloUseCaseOutput = string

@Injectable()
export class BioProductHelloUseCase
  implements
    IUseCase<BioProductHelloUseCaseInput, BioProductHelloUseCaseOutput>
{
  private readonly logger = new Logger(BioProductHelloUseCase.name)
  constructor(
    @Inject(BioProductRepositoryToken)
    private readonly bioProductRepository: IBioProductRepository,
    @Inject(AppConfigToken) private readonly appConfig: IAppConfig,
    @Inject(PuppeteerServiceToken)
    private readonly puppeteerService: IPuppeteerService,
  ) {}

  async handle() {
    const res = await firstValueFrom(
      this.puppeteerService.sayHello({ name: this.appConfig.SERVICE_NAME }),
    )

    this.logger.verbose(res.response)

    return this.bioProductRepository.helloCleanArchitecture()
  }
}
