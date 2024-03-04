import {
  Autocomplete,
  AutocompleteProps,
  Popper,
  styled,
  TextField,
  TextFieldProps,
} from '@mui/material'
import { Control, Controller, Path, FieldValues } from 'react-hook-form'

export type FormAutocompleteProps<
  T extends FieldValues = FieldValues,
  OptionType = any,
> = {
  name: Path<T>
  label: string
  control: Control<T>

  options: OptionType[]
  getOptionLabel: (option: OptionType) => string
  getOptionValue: (option: OptionType) => unknown

  disableError?: boolean
  multiple?: boolean
  groupBy?: AutocompleteProps<
    OptionType,
    undefined,
    undefined,
    undefined
  >['groupBy']
  size?: AutocompleteProps<OptionType, undefined, undefined, undefined>['size']
  textFieldProps?: TextFieldProps
}

export function FormAutocomplete<
  TFieldValues extends FieldValues = FieldValues,
  OptionType = unknown,
>({
  name,
  label,
  control,
  options,
  getOptionLabel,
  getOptionValue,
  groupBy,
  multiple = false,
  disableError = false,
  size = 'small',
  textFieldProps = {},
}: FormAutocompleteProps<TFieldValues, OptionType>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ref, value }, fieldState: { error } }) => {
        const errorProps = !disableError
          ? {
              error: Boolean(error),
              helperText: error?.message,
            }
          : {}

        return (
          <Autocomplete
            fullWidth
            multiple={multiple}
            size={size}
            filterSelectedOptions={!!multiple}
            options={options}
            groupBy={groupBy}
            PopperComponent={StyledPopper}
            getOptionLabel={getOptionLabel}
            onChange={(event, value, reason) => {
              if (value) {
                if (Array.isArray(value)) {
                  onChange(value.map(getOptionValue))
                } else {
                  onChange(getOptionValue(value))
                }
              }
            }}
            value={
              multiple === true
                ? options.filter((option) =>
                    value?.includes(getOptionValue(option)),
                  )
                : options.find((option) => getOptionValue(option) === value)
            }
            renderInput={(params) => (
              <TextField
                {...textFieldProps}
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

const StyledPopper = styled(Popper)(({ theme }) => ({
  '& .MuiAutocomplete-groupLabel': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
}))
