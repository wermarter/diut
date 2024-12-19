import { PrintForm } from '@diut/hcdc'

export type SamplePrintOptions = {
  sampleId: string
  printFormId: string
  testIds: string[]
  sampleTypeIds: string[]
  overrideAuthor?: Pick<PrintForm, 'authorName' | 'authorTitle'>
  overrideTitleMargin?: Pick<PrintForm, 'titleMargin'>['titleMargin']
}
