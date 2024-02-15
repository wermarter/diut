import { stringEnumValues } from '@diut/common'
import { BaseEntity } from '../base-entity'
import { Branch } from '../branch'

export enum PrintTemplate {
  FormChung = 'FormChung',
  FormHIV = 'FormHIV',
  FormPap = 'FormPap',
  FormSoiNhuom = 'FormSoiNhuom',
  FormTD = 'FormTD',
}

export const PrintTemplateValues = stringEnumValues(PrintTemplate)

export type PrintForm = BaseEntity & {
  displayIndex: number
  name: string
  isA4: boolean
  isAuthorLocked: boolean
  authorTitle: string
  authorName: string
  titleMargin: number

  template: PrintTemplate

  branchId: string
  branch?: Branch | null
}

export enum PrintFormAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
  OverrideAuthor = 'OverrideAuthor',
}
