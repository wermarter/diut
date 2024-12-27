import { AssertAllKeysInArray } from '@diut/common'

export enum ExternalRoutePath {
  PrintSampleResult = 'print-sample-result',
  GetSampleResult = 'get-sample-result',
}

export type ExternalRoute = {
  path: ExternalRoutePath
  branchId: string
}

export enum ExternalRouteAction {
  Generate = 'Generate',
}

export const ExternalRouteFields = [
  'path',
  'branchId',
] satisfies (keyof ExternalRoute)[]

true satisfies AssertAllKeysInArray<typeof ExternalRouteFields, ExternalRoute>
