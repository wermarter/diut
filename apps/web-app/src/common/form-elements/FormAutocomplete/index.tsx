import { Autocomplete, TextField as MuiTextField } from '@mui/material'
import { Control, Controller, Path, FieldValues } from 'react-hook-form'

export type FormAutocompleteProps<
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
}

export function FormAutocomplete<
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
}: FormAutocompleteProps<TFieldValues, OptionType>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, ref },
        fieldState: { error },
        formState: { defaultValues },
      }) => {
        const errorProps = !disableError
          ? {
              error: Boolean(error),
              helperText: error?.message,
            }
          : {}

        return (
          <Autocomplete
            multiple
            options={options}
            getOptionLabel={getOptionLabel}
            onChange={(event, value, reason) => {
              onChange(value.map(getOptionValue))
            }}
            defaultValue={options.filter((option) =>
              defaultValues?.[name]?.includes(getOptionValue(option))
            )}
            filterSelectedOptions
            renderInput={(params) => (
              <MuiTextField
                {...params}
                {...errorProps}
                inputRef={ref}
                InputLabelProps={{
                  shrink: true,
                }}
                label={label}
              />
            )}
          />
        )
      }}
    />
  )
}