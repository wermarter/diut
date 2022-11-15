export enum PrintForm {
  Basic = 'basic',
  SoiNhuom = 'soi-nhuom',
  HIV = 'hiv',
  TD = 'td',
}

export const printForms: Array<{
  label: string
  value: PrintForm
}> = [
  {
    label: 'Form chung',
    value: PrintForm.Basic,
  },
  {
    label: 'Form HIV',
    value: PrintForm.HIV,
  },
  {
    label: 'Form soi nhuộm',
    value: PrintForm.SoiNhuom,
  },
  {
    label: 'Form TD',
    value: PrintForm.TD,
  },
]
