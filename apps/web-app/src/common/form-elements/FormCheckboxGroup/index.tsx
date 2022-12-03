import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@mui/material'
import { Control, Controller, Path, FieldValues } from 'react-hook-form'

export type FormCheckboxGroupProps<
  T extends FieldValues = FieldValues,
  OptionType = any
> = {
  name: Path<T>
  label: string
  control: Control<T>

  options: OptionType[]
  getOptionLabel: (option: OptionType) => string
  getOptionValue: (option: OptionType) => unknown

  disableError?: boolean
  disabled?: boolean
}

export function FormCheckboxGroup<
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
  disabled = false,
}: FormCheckboxGroupProps<TFieldValues, OptionType>) {
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
          <FormControl
            fullWidth
            disabled={disabled}
            error={errorProps.error}
            component="fieldset"
            ref={ref}
          >
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup row>
              {options.map((option) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...formFields}
                      checked={value?.includes(getOptionValue(option))}
                      onChange={(event) => {
                        const selected = event.target.checked

                        if (selected === true) {
                          // Add new
                          onChange(value?.concat(getOptionValue(option)))
                        } else {
                          // Remove selected
                          onChange(
                            value?.filter(
                              (optionValue: unknown) =>
                                optionValue !== getOptionValue(option)
                            )
                          )
                        }
                      }}
                    />
                  }
                  label={getOptionLabel(option)}
                />
              ))}
            </FormGroup>
            {errorProps.error && (
              <FormHelperText error>{errorProps.helperText}</FormHelperText>
            )}
          </FormControl>
        )
      }}
    />
  )
}
