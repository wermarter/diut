import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'
import { Control, Controller, Path, FieldValues } from 'react-hook-form'

export type FormSelectProps<
  T extends FieldValues = FieldValues,
  OptionType = any
> = {
  control: Control<T>
  name: Path<T>
  label: string
  options: OptionType[]
  getOptionLabel: (option: OptionType) => string
  getOptionValue: (option: OptionType) => string
  disableError?: boolean
  size?: 'small' | 'medium'
}

export function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  OptionType = any
>({
  name,
  label,
  control,
  options,
  getOptionLabel,
  getOptionValue,
  disableError = false,
  size = 'small',
}: FormSelectProps<TFieldValues, OptionType>) {
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
          <FormControl fullWidth size={size} error={errorProps.error}>
            <InputLabel shrink>{label}</InputLabel>
            <Select
              {...formFields}
              inputRef={ref}
              label={label}
              input={<OutlinedInput notched label={label} />}
            >
              {options.map((option) => (
                <MenuItem
                  key={getOptionValue(option)}
                  value={getOptionValue(option)}
                >
                  {getOptionLabel(option)}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errorProps.helperText}</FormHelperText>
          </FormControl>
        )
      }}
    />
  )
}
