import { OutlinedInputProps } from '@mui/material'
import { Control, Path, FieldValues } from 'react-hook-form'

import { FormDateTimePicker } from '../FormDateTimePicker'

export type FormDateRangePickerProps<T extends FieldValues = FieldValues> =
  Omit<OutlinedInputProps, 'name'> & {
    fromDateName: Path<T>
    toDateName: Path<T>
    label: string
    control: Control<T>
    disableError?: boolean
  }

export function FormDateRangePicker<
  TFieldValues extends FieldValues = FieldValues,
>({
  fromDateName,
  toDateName,
  control,
  disableError = false,
  ...outlinedInputProps
}: FormDateRangePickerProps<TFieldValues>) {
  const fromDate = control._getWatch(fromDateName) as Date
  const toDate = control._getWatch(fromDateName) as Date

  return (
    <>
      <FormDateTimePicker
        {...outlinedInputProps}
        sx={[
          {
            mr: 2,
          },
          ...(Array.isArray(outlinedInputProps.sx)
            ? outlinedInputProps.sx
            : [outlinedInputProps.sx]),
        ]}
        control={control}
        name={fromDateName}
        dateOnly
        label="Từ ngày"
        disableError={disableError}
      />
      <FormDateTimePicker
        {...outlinedInputProps}
        control={control}
        name={fromDateName}
        dateOnly
        label="Đến ngày"
        disableError={disableError}
      />
    </>
  )
}
