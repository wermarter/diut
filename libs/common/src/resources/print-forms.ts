export enum PrintForm {
  Basic = '63796155ea75acb19f805c51',
  SoiNhuom = '63796155ea75acb19f805c53',
  HIV = '63796155ea75acb19f805c52',
  TD = '63796155ea75acb19f805c54',
}

export const printForms: Array<{
  label: string
  value: PrintForm
  isA4: boolean
  filename: string
}> = [
  {
    label: 'Form chung',
    value: PrintForm.Basic,
    isA4: true,
    filename: 'basic',
  },
  {
    label: 'Form HIV',
    value: PrintForm.HIV,
    isA4: false,
    filename: 'hiv',
  },
  {
    label: 'Form soi nhuộm',
    value: PrintForm.SoiNhuom,
    isA4: false,
    filename: 'soi-nhuom',
  },
  {
    label: 'Form TD',
    value: PrintForm.TD,
    isA4: true,
    filename: 'td',
  },
]
