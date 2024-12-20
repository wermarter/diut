import { AssertAllKeysInArray } from '@diut/common'

export enum ExternalRoutePath {
  PrintSampleResult = 'print-sample-result',
}

export type ExternalRoute = {
  path: ExternalRoutePath
  branchId: string
}

export enum ExternalRouteAction {
  Generate = 'Generate',
  View = 'View',
}

export const ExternalRouteFields = [
  'path',
  'branchId',
] satisfies (keyof ExternalRoute)[]

true satisfies AssertAllKeysInArray<typeof ExternalRouteFields, ExternalRoute>
