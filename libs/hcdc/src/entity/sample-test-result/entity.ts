import { AssertAllKeysInArray } from '@diut/common'
import { SampleResultTest } from '../sample/entity'

export type SampleTestResult = Required<SampleResultTest>

export enum SampleTestResultAction {
  Modify = 'Modify',
}

export const SampleTestResultFields = [
  'testId',
  'test',
  'isLocked',
  'resultById',
  'resultBy',
  'resultAt',
  'bioProductName',
  'instrumentName',
  'elements',
] satisfies (keyof SampleTestResult)[]

true satisfies AssertAllKeysInArray<
  typeof SampleTestResultFields,
  SampleTestResult
>
