import { BaseEntity } from '../base-entity'
import { Branch } from '../branch'
import { Test } from '../test/entity'

export type TestCombo = BaseEntity & {
  displayIndex: number
  name: string

  testIds: string[]
  tests?: (Test | null)[]

  branchId: string
  branch?: Branch | null
}
