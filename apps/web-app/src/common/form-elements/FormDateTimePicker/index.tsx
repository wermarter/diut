import { TextField as MuiTextField } from '@mui/material'
import { Control, Controller, Path, FieldValues } from 'react-hook-form'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

export type FormDateTimePickerProps<T extends FieldValues = FieldValues> = {
  name: Path<T>
  label: string
  control: Control<T>
  disableError?: boolean
}

export function FormDateTimePicker<
  TFieldValues extends FieldValues = FieldValues
>({
  name,
  label,
  control,
  disableError = false,
}: FormDateTimePickerProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...formFields }, fieldState: { error } }) => {
        const errorProps = !disableError
          ? {
              error: Boolean(error),
              helperText: error?.message,
            }
          : {}

        return (
          <DateTimePicker
            {...formFields}
            inputRef={ref}
            disableFuture
            dayOfWeekFormatter={(day) => {
              if (day === 'CN') return day
              return day
                .split(' ')
                .map((word) => word[0])
                .join('')
            }}
            label={label}
            renderInput={(params) => (
              <MuiTextField
                InputLabelProps={{
                  shrink: true,
                }}
                {...params}
                {...errorProps}
              />
            )}
          />
        )
      }}
    />
  )
}
