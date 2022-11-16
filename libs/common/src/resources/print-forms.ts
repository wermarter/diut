export enum PrintForm {
  Basic = 'basic',
  SoiNhuom = 'soi-nhuom',
  HIV = 'hiv',
  TD = 'td',
}

export const printForms: Array<{
  label: string
  value: PrintForm
  isA4: boolean
}> = [
  {
    label: 'Form chung',
    value: PrintForm.Basic,
    isA4: true,
  },
  {
    label: 'Form HIV',
    value: PrintForm.HIV,
    isA4: false,
  },
  {
    label: 'Form soi nhuộm',
    value: PrintForm.SoiNhuom,
    isA4: false,
  },
  {
    label: 'Form TD',
    value: PrintForm.TD,
    isA4: true,
  },
]
