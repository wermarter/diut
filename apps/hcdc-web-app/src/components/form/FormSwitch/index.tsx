import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
} from '@mui/material'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

export type FormSwitchProps<T extends FieldValues = FieldValues> = {
  name: Path<T>
  label: string
  control: Control<T>
  disableError?: boolean
  disabled?: boolean
}

export function FormSwitch<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  control,
  disableError = false,
  disabled = false,
}: FormSwitchProps<TFieldValues>) {
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
          <FormControl fullWidth disabled={disabled} error={errorProps.error}>
            <FormControlLabel
              control={
                <Switch
                  {...formFields}
                  inputRef={ref}
                  checked={value}
                  onChange={(event) => onChange(event.target.checked)}
                />
              }
              label={label}
            />
            {errorProps.error && (
              <FormHelperText error>{errorProps.helperText}</FormHelperText>
            )}
          </FormControl>
        )
      }}
    />
  )
}
