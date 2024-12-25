import { ExternalRoutePath } from '@diut/hcdc'
import { SamplePrintOptions } from 'src/app/sample/common'

export type ExternalRouteOptions = {
  [ExternalRoutePath.PrintSampleResult]: {
    printOptions: SamplePrintOptions[]
  }
  [ExternalRoutePath.GetSampleResult]: {
    sampleId: string
  }
}
