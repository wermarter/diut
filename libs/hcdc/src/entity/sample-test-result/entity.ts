import { Sample, SampleResultTest } from '../sample/entity'

export type SampleTestResult = {
  sample: Sample
  oldResult: Required<SampleResultTest>
}

export enum SampleTestResultAction {
  Modify = 'Modify',
}
