import { BaseEntity } from '../base-entity'
import { Branch } from '../branch'
import { PatientCategory } from '../patient'
import { Test } from '../test/entity'

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
  branch?: Branch | null
}
