import { TextField, TextFieldProps } from '@mui/material'
import { Control, Controller, Path, FieldValues } from 'react-hook-form'

export type FormTextFieldProps<T extends FieldValues = FieldValues> = Omit<
  TextFieldProps,
  'name'
> & {
  name: Path<T>
  control: Control<T>
}

export function FormTextField<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  ...textFieldProps
}: FormTextFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...formFields }, fieldState: { error } }) => (
        <TextField
          {...textFieldProps}
          error={Boolean(error)}
          helperText={error?.message}
          inputRef={ref}
          {...formFields}
        />
      )}
    />
  )
}
