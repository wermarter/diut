import { AssertAllKeysInArray } from '@diut/common'
import { BaseEntity, baseEntityKeys } from '../base-entity'
import { Branch } from '../branch'
import { PatientCategory } from '../patient'
import { Test } from '../test'

export type NormalRule = {
  category: PatientCategory

  defaultChecked?: boolean
  normalValue?: string
  normalLowerBound?: number
  normalUpperBound?: number

  description: string
  note: string
}

export type TestElement = BaseEntity & {
  displayIndex: number
  name: string
  printIndex: number
  reportIndex: number
  unit: string
  isParent: boolean

  normalRules: NormalRule[]

  testId: string
  test?: Test | null

  branchId: string
  branch?: Branch
}

export enum TestElementAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

export const TestElementFields = [
  ...baseEntityKeys,
  'displayIndex',
  'name',
  'printIndex',
  'reportIndex',
  'unit',
  'isParent',
  'normalRules',
  'testId',
  'test',
  'branchId',
  'branch',
] satisfies (keyof TestElement)[]

true satisfies AssertAllKeysInArray<typeof TestElementFields, TestElement>
