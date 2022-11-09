import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { format } from 'date-fns'
import { Control, Controller, Path, FieldValues } from 'react-hook-form'

export type FormDateTimePickerProps<T extends FieldValues = FieldValues> = {
  name: Path<T>
  label: string
  control: Control<T>
  disableError?: boolean
  dateOnly?: boolean
  disabled?: boolean
}

export function FormDateTimePicker<
  TFieldValues extends FieldValues = FieldValues
>({
  name,
  label,
  control,
  disableError = false,
  dateOnly = false,
  disabled = false,
}: FormDateTimePickerProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { ref, value, onChange, ...formFields },
        fieldState: { error },
      }) => {
        const errorProps = !disableError
          ? {
              error: Boolean(error),
              helperText: error?.message,
            }
          : {}
        return (
          <FormControl fullWidth disabled={disabled}>
            <InputLabel shrink error={errorProps.error}>
              {label}
            </InputLabel>
            <OutlinedInput
              error={errorProps.error}
              type={dateOnly ? 'date' : 'datetime-local'}
              inputRef={ref}
              label={label}
              notched
              title={label}
              value={format(
                value,
                dateOnly ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm'
              )}
              onChange={(e) => {
                onChange(new Date(e.target.value))
              }}
              inputProps={{
                max: format(
                  Date.now(),
                  dateOnly ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm'
                ),
              }}
              {...formFields}
            />
            {errorProps.error && (
              <FormHelperText error>{errorProps.helperText}</FormHelperText>
            )}
          </FormControl>
        )

        // return (
        //   <DateTimePicker
        //     {...formFields}
        //     inputRef={ref}
        //     disableFuture
        //     dayOfWeekFormatter={(day) => {
        //       if (day === 'CN') return day
        //       return day
        //         .split(' ')
        //         .map((word) => word[0])
        //         .join('')
        //     }}
        //     label={label}
        //     renderInput={(params) => (
        //       <MuiTextField
        //         InputLabelProps={{
        //           shrink: true,
        //         }}
        //         {...params}
        //         {...errorProps}
        //       />
        //     )}
        //   />
        // )
      }}
    />
  )
}
