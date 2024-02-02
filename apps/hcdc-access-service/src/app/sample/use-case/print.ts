import { Injectable, OnModuleInit } from '@nestjs/common'

import { PrintTemplate } from 'src/domain'
import { SamplePrintContext } from '../print-strategy/context'
import { SamplePrintFormChungStrategy } from '../print-strategy/form-chung'
import { ISamplePrintStrategy } from '../print-strategy/common'

@Injectable()
export class SamplePrintUseCase implements OnModuleInit {
  constructor(
    private readonly samplePrintContext: SamplePrintContext,
    private readonly samplePrintFormChungStrategy: SamplePrintFormChungStrategy,
  ) {}

  async execute(input: { template: PrintTemplate; sampleIds: string[] }) {
    let strategy: ISamplePrintStrategy

    switch (input.template) {
      case PrintTemplate.FormChung:
        strategy = this.samplePrintFormChungStrategy
        break
      default:
        throw new Error()
    }

    this.samplePrintContext.setStrategy(strategy)

    return this.samplePrintContext.execute(input.sampleIds)
  }

  onModuleInit() {
    this.execute({ template: PrintTemplate.FormChung, sampleIds: [] })
  }
}
