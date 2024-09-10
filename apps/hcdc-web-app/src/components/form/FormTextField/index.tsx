import { TextField, TextFieldProps } from '@mui/material'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

export type FormTextFieldProps<T extends FieldValues = FieldValues> = Omit<
  TextFieldProps,
  'name'
> & {
  name: Path<T>
  control: Control<T>
  disableError?: boolean
}

export function FormTextField<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  disableError = false,
  ...textFieldProps
}: FormTextFieldProps<TFieldValues>) {
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
          <TextField
            {...textFieldProps}
            {...errorProps}
            inputRef={ref}
            InputLabelProps={{
              shrink: true,
            }}
            {...formFields}
          />
        )
      }}
    />
  )
}
