import { Inject, Injectable } from '@nestjs/common'

import { ExampleServiceSayHiUsecase } from 'src/app/example-service'
import { SampleSearchUseCase } from '../use-case/search'
import { ISamplePrintStrategy } from './common'
import {
  AuthContextToken,
  AuthSubject,
  IAuthContext,
  SampleAction,
  assertPermission,
} from 'src/domain'

@Injectable()
export class SamplePrintContext {
  private printStrategy: ISamplePrintStrategy

  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly sampleSearchUseCase: SampleSearchUseCase,
    private readonly exampleServiceSayHiUsecase: ExampleServiceSayHiUsecase,
  ) {}

  setStrategy(printStrategy: ISamplePrintStrategy) {
    this.printStrategy = printStrategy
    return this
  }

  async execute(sampleIds: string[]) {
    const { ability } = this.authContext.getData()

    const samples = (
      await this.sampleSearchUseCase.execute({
        filter: { _id: { $in: sampleIds } },
      })
    ).items

    for (const sample of samples) {
      assertPermission(
        ability,
        AuthSubject.Sample,
        SampleAction.PrintResult,
        sample,
      )
    }

    const printDataArray: unknown[] = []
    for (const sampleId of sampleIds) {
      const printData = await this.printStrategy.preparePrintData(sampleId)
      printDataArray.push(printData)
    }

    const printConfig = this.printStrategy.getPrintConfig()
    this.exampleServiceSayHiUsecase.execute({
      myNameIs: JSON.stringify({ printConfig, printDataArray }, null, 2),
    })
  }
}
