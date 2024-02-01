import { ISampleRepository, PrintTemplate } from 'src/domain'

export interface ISamplePrintStrategy {
  getPrintConfig(): unknown
  preparePrintData(sampleId: string): unknown
}

export abstract class AbstractSamplePrintStrategy
  implements ISamplePrintStrategy
{
  constructor(
    protected readonly sampleRepository: ISampleRepository,
    protected readonly template: PrintTemplate,
  ) {}

  abstract getPrintConfig(): unknown

  preparePrintData(sampleId: string): unknown {
    return {}
  }
}
